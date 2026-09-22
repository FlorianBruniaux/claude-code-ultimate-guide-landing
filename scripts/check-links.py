#!/usr/bin/env python3
"""Check published link targets, including interactive datasets. Python stdlib + curl.

Offline: --dist dist --guide-root ../claude-code-ultimate-guide
Online:  --site https://cc.bruniaux.com --external
Exit 1: broken targets. Exit 2: incomplete inventory or unverified HTTP responses.
"""
import argparse
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import threading
import time
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit
import xml.etree.ElementTree as ET

SITE = 'https://cc.bruniaux.com'
LANDING = 'FlorianBruniaux/claude-code-ultimate-guide-landing'
GUIDE = 'FlorianBruniaux/claude-code-ultimate-guide'
DATASETS = ['/api/questions.json', '/search-index.json', '/api/link-targets.json']


def normalize(raw, base):
    if not isinstance(raw, str) or not raw.strip() or raw.startswith('#'):
        return None
    if any(marker in raw for marker in ('${', '<', '>', '\\')):
        return None
    parts = urlsplit(urljoin(base, unescape(raw).strip()))
    if parts.scheme not in ('http', 'https') or not parts.hostname or parts.username:
        return None
    return urlunsplit((parts.scheme, parts.netloc, parts.path or '/', parts.query, ''))


def js_links(source):
    # Inspect href literals only; arbitrary strings can be code examples or templates.
    return re.findall(r'\bhref\s*[:=]\s*["\']([^"\'<>]+)["\']', source)


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links, self.scripts, self.inline = [], [], []
        self.in_script = False

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag in ('a', 'area'):
            self.links.extend(attrs[key] for key in ('href', 'xlink:href') if attrs.get(key))
        if attrs.get('data-guide-url'):
            self.links.append(attrs['data-guide-url'])
        if tag == 'script':
            self.in_script = True
            if attrs.get('src'):
                self.scripts.append(attrs['src'])
        if tag == 'meta' and attrs.get('http-equiv', '').lower() == 'refresh':
            match = re.search(r'url\s*=\s*(.*)', attrs.get('content', ''), re.I)
            if match:
                self.links.append(match[1].strip('"\''))

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False

    def handle_data(self, value):
        if self.in_script:
            self.inline.append(value)


def dataset_links(data):
    if isinstance(data, list):
        for item in data:
            yield from dataset_links(item)
    elif isinstance(data, dict):
        for key, value in data.items():
            if key in ('url', 'href', 'doc_url', 'official_doc') and isinstance(value, str):
                yield value
            elif key == 'source_file' and isinstance(value, str):
                yield f'https://github.com/{LANDING}/blob/main/{value}'
            elif key == 'urls' and isinstance(value, list):
                yield from value
            elif isinstance(value, (dict, list)):
                yield from dataset_links(value)


def exact_path(root, relative):
    """Also reject case mismatches on case-insensitive developer filesystems."""
    current = root
    for part in Path(relative).parts:
        if part in ('.', '..') or not current.is_dir():
            return None
        if part not in {child.name for child in current.iterdir()}:
            return None
        current /= part
    return current


def github_path(url):
    parsed = urlsplit(url)
    parts = unquote(parsed.path).strip('/').split('/')
    if parsed.hostname == 'github.com' and len(parts) >= 5 and parts[2] in ('blob', 'tree') and parts[3] == 'main':
        return '/'.join(parts[:2]), '/'.join(parts[4:]), False
    if parsed.hostname == 'raw.githubusercontent.com' and len(parts) >= 4 and parts[2] == 'main':
        return '/'.join(parts[:2]), '/'.join(parts[3:]), True
    return None


def classify(status, error=False):
    if error:
        return 'unverified'
    if status in (404, 410):
        return 'broken'
    return 'http-ok' if status in (200, 206) else 'unverified'


_rate_lock = threading.Lock()
_next_request = {}


def request(url, body=False, method='GET'):
    host = urlsplit(url).netloc
    with _rate_lock:
        now = time.monotonic()
        start = max(now, _next_request.get(host, now))
        _next_request[host] = start + (0.7 if host == 'github.com' else 0.15)
    time.sleep(max(0, start - time.monotonic()))
    args = ['curl', '--silent', '--show-error', '--location', '--globoff',
            '--proto', '=http,https', '--proto-redir', '=http,https',
            '--max-redirs', '8', '--connect-timeout', '8', '--max-time', '25',
            '--user-agent', 'CCGuide-LinkCheck/1.0', '--compressed',
            '--write-out', '\n%{json}']
    if method == 'HEAD':
        args += ['--head']
    if not body:
        args += ['--output', '/dev/null']
    result = subprocess.run(args + [url], capture_output=True, text=True)
    content, _, metadata = result.stdout.rpartition('\n')
    try:
        meta = json.loads(metadata)
    except ValueError:
        meta = {}
    status = meta.get('http_code', 0)
    return {'url': url, 'status': status, 'method': method,
            'classification': classify(status, result.returncode != 0),
            'effective_url': meta.get('url_effective', url), 'error': result.stderr[-300:]}, content


def check_http(url):
    record, _ = request(url, method='HEAD')
    if record['classification'] != 'http-ok':
        record, _ = request(url)  # Never classify a HEAD-only failure as a dead link.
    return record


def collect(dist=None, site=SITE):
    references = defaultdict(set)
    scripts = set()
    documents = 0

    def add(raw, origin):
        target = normalize(raw, origin)
        if target:
            references[target].add(origin)

    def read(url):
        if dist:
            path = exact_path(dist, unquote(urlsplit(url).path).lstrip('/'))
            if path and path.is_dir():
                path /= 'index.html'
            if not path or not path.is_file():
                raise ValueError(f'Missing inventory input: {url}')
            return path.read_text()
        record, content = request(url, body=True)
        if record['classification'] != 'http-ok':
            raise ValueError(f'Cannot inventory {url}: HTTP {record["status"]}')
        return content

    if dist:
        page_urls = [site + '/' + str(p.relative_to(dist)).removesuffix('index.html')
                     for p in sorted(dist.rglob('*.html')) if p.name != '404.html']
    else:
        pending, page_urls, seen = [site + '/sitemap-index.xml'], [], set()
        while pending:
            sitemap = pending.pop()
            if sitemap in seen:
                continue
            seen.add(sitemap)
            xml = ET.fromstring(read(sitemap))
            targets = [node.text for node in xml.iter() if node.tag.endswith('}loc') or node.tag == 'loc']
            if xml.tag.endswith('sitemapindex'):
                pending.extend(targets)
            else:
                page_urls.extend(targets)
        if not page_urls:
            raise ValueError('Sitemap has no pages')
    with ThreadPoolExecutor(max_workers=6) as pool:
        for url, content in zip(page_urls, pool.map(read, page_urls)):
            add(url, 'page inventory')
            parser = Page()
            parser.feed(content)
            documents += 1
            for raw in parser.links + js_links('\n'.join(parser.inline)):
                add(raw, url)
            for raw in parser.scripts:
                target = normalize(raw, url)
                if target and urlsplit(target).netloc == urlsplit(site).netloc:
                    scripts.add(target)
    if not dist:
        seen_pages = set(page_urls)
        while True:
            extra = sorted(url for url in references if url not in seen_pages
                           and urlsplit(url).netloc == urlsplit(site).netloc
                           and urlsplit(url).path.endswith('/') and not urlsplit(url).query)
            if not extra:
                break
            seen_pages.update(extra)
            with ThreadPoolExecutor(max_workers=6) as pool:
                for url, (record, content) in zip(extra, pool.map(lambda u: request(u, body=True), extra)):
                    if record['classification'] != 'http-ok':
                        continue  # Kept in the target inventory for the HTTP pass.
                    parser = Page()
                    parser.feed(content)
                    documents += 1
                    for raw in parser.links + js_links('\n'.join(parser.inline)):
                        add(raw, url)
                    for raw in parser.scripts:
                        target = normalize(raw, url)
                        if target and urlsplit(target).netloc == urlsplit(site).netloc:
                            scripts.add(target)
    with ThreadPoolExecutor(max_workers=6) as pool:
        for url, content in zip(sorted(scripts), pool.map(read, sorted(scripts))):
            for raw in js_links(content):
                add(raw, url)
    for path in DATASETS:
        url = site + path
        add(url, 'interactive dataset')
        for raw in dataset_links(json.loads(read(url))):
            add(raw, url)
    return references, documents


def check_local(url, dist, roots, site=SITE):
    parsed = urlsplit(url)
    if parsed.netloc == urlsplit(site).netloc:
        target = exact_path(dist, unquote(parsed.path).lstrip('/'))
        if target and target.is_dir():
            target /= 'index.html'
        exists = bool(target and target.is_file())
    else:
        gh = github_path(url)
        if not gh or gh[0] not in roots:
            return None
        target = exact_path(roots[gh[0]], gh[1])
        exists = bool(target and (target.is_file() if gh[2] else target.exists()))
    return {'url': url, 'classification': 'local-ok' if exists else 'broken',
            'evidence': 'exact local path' if exists else 'missing local target'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dist', type=Path)
    parser.add_argument('--site', default=SITE)
    parser.add_argument('--guide-root', type=Path, default=Path('../claude-code-ultimate-guide'))
    parser.add_argument('--external', action='store_true')
    parser.add_argument('--report', type=Path, default=Path('link-check'))
    args = parser.parse_args()
    refs, documents = collect(args.dist, args.site.rstrip('/'))
    roots = {LANDING: Path(__file__).resolve().parents[1], GUIDE: args.guide_root.resolve()}
    records, remote = [], []
    trees = {}
    if not args.dist:
        for repo in roots:
            response, body = request(f'https://api.github.com/repos/{repo}/git/trees/main?recursive=1', body=True)
            if response['classification'] == 'http-ok':
                tree = json.loads(body)
                if not tree.get('truncated'):
                    trees[repo] = {entry['path']: entry['type'] for entry in tree.get('tree', [])}
    for url in sorted(refs):
        result = check_local(url, args.dist, roots, args.site) if args.dist else None
        gh = github_path(url)
        if result is None and gh and gh[0] in trees:
            kind = trees[gh[0]].get(gh[1].rstrip('/'))
            if kind and (not gh[2] or kind == 'blob'):
                result = {'url': url, 'classification': 'github-tree-ok'}
        if result:
            records.append(result)
        elif args.external or urlsplit(url).netloc == urlsplit(args.site).netloc:
            remote.append(url)
        else:
            records.append({'url': url, 'classification': 'not-checked'})
    with ThreadPoolExecutor(max_workers=8) as pool:
        for record in pool.map(check_http, remote):
            records.append(record)
    for record in records:
        record['sources'] = sorted(refs[record['url']])
    counts = dict(Counter(r['classification'] for r in records))
    report = {'checked_at': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
              'documents': documents, 'targets': len(refs), 'counts': counts, 'records': records}
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.with_suffix('.json').write_text(json.dumps(report, indent=2) + '\n')
    lines = ['# Link check', '', f'{documents} HTML documents; {len(refs)} distinct targets.', '', str(counts), '']
    for label in ('broken', 'unverified'):
        lines += ['## ' + label.capitalize(), '']
        for record in records:
            if record['classification'] == label:
                lines.append(f'- {record.get("status", record.get("evidence"))}: {record["url"]} (from {record["sources"][0]})')
        lines.append('')
    args.report.with_suffix('.md').write_text('\n'.join(lines))
    print(json.dumps({k: report[k] for k in ('documents', 'targets', 'counts')}))
    return 1 if counts.get('broken') else (2 if counts.get('unverified') else 0)


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except (OSError, ValueError, ET.ParseError) as error:
        print(f'Link inventory incomplete: {error}')
        raise SystemExit(2)
