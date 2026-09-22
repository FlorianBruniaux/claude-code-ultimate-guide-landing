import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('links', Path(__file__).with_name('check-links.py'))
links = importlib.util.module_from_spec(spec)
spec.loader.exec_module(links)


class LinkChecks(unittest.TestCase):
    def test_denied_and_throttled_requests_are_not_valid_or_broken(self):
        for status in (0, 202, 403, 405, 429, 500, 999):
            self.assertEqual(links.classify(status), 'unverified')
        self.assertEqual(links.classify(404), 'broken')
        self.assertEqual(links.classify(410), 'broken')
        self.assertEqual(links.classify(200), 'http-ok')
        self.assertEqual(links.classify(200, True), 'unverified')

    def test_svg_diagram_and_javascript_links_are_collected(self):
        page = links.Page()
        page.feed('<a href="/guide/"></a><a xlink:href="/diagram/"></a><g data-guide-url="/source/"></g><script>const x={href:"/workflows/"}</script>')
        self.assertEqual(page.links, ['/guide/', '/diagram/', '/source/'])
        self.assertEqual(links.js_links(''.join(page.inline)), ['/workflows/'])

    def test_exact_paths_reject_wrong_case_and_raw_directories(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            folder = root / 'examples/skills/token-audit'
            folder.mkdir(parents=True)
            (folder / 'skill.md').write_text('test')
            roots = {links.GUIDE: root}
            base = f'https://raw.githubusercontent.com/{links.GUIDE}/main/examples/skills/'
            for path in ('token-audit/SKILL.md', 'token-audit/'):
                self.assertEqual(links.check_local(base + path, root, roots)['classification'], 'broken')
            self.assertEqual(links.check_local(base + 'token-audit/skill.md', root, roots)['classification'], 'local-ok')

    def test_quiz_source_paths_and_search_urls_are_checked(self):
        targets = list(links.dataset_links({'questions': [{'source_file': 'questions/01.md', 'doc_url': '/guide/'}], 'urls': ['/examples/']}))
        self.assertIn(f'https://github.com/{links.LANDING}/blob/main/questions/01.md', targets)
        self.assertIn('/guide/', targets)
        self.assertIn('/examples/', targets)

    def test_inventory_covers_nested_html_scripts_and_datasets(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            (root / 'nested').mkdir()
            (root / 'api').mkdir()
            (root / 'index.html').write_text('<a href="/nested/">Nested</a>')
            (root / 'nested/index.html').write_text('<script src="/quiz.js"></script><a href="/missing/">Broken</a>')
            (root / 'quiz.js').write_text('const cta={href:"/workflows/"}')
            for path in links.DATASETS:
                (root / path.lstrip('/')).write_text(json.dumps({'urls': ['/dynamic/']}))
            refs, documents = links.collect(root)
            self.assertEqual(documents, 2)
            self.assertIn(links.SITE + '/missing/', refs)
            self.assertIn(links.SITE + '/workflows/', refs)
            self.assertIn(links.SITE + '/dynamic/', refs)
            self.assertEqual(links.check_local(links.SITE + '/missing/', root, {})['classification'], 'broken')
            (root / 'api/link-targets.json').unlink()
            with self.assertRaisesRegex(ValueError, 'Missing inventory input'):
                links.collect(root)


if __name__ == '__main__':
    unittest.main()
