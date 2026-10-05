#!/usr/bin/env python3
"""Archive one complete GitHub rolling traffic window without overwriting evidence."""
import argparse
import datetime as dt
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile

ENDPOINTS = {
    "repository": "",
    "views": "/traffic/views?per=day",
    "clones": "/traffic/clones?per=day",
    "referrers": "/traffic/popular/referrers",
    "paths": "/traffic/popular/paths",
}


def github_get(endpoint):
    result = subprocess.run(
        ["gh", "api", "-H", "Accept: application/vnd.github+json", "-H",
         "X-GitHub-Api-Version: 2022-11-28", endpoint],
        capture_output=True, text=True, check=False,
    )
    if result.returncode:
        # Do not print CLI stderr: credentials and authentication links are not evidence.
        raise RuntimeError(f"GitHub request failed for {endpoint}; access/network unavailable, metrics UNKNOWN")
    return json.loads(result.stdout)


def collect(repository, get=github_get, observed_at=None):
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repository):
        raise ValueError("Expected owner/repository")
    observed_at = observed_at or dt.datetime.now(dt.timezone.utc)
    raw = {name: get(f"repos/{repository}{suffix}") for name, suffix in ENDPOINTS.items()}
    bounds = {}
    for name in ("views", "clones"):
        value = raw[name]
        if not isinstance(value, dict) or not isinstance(value.get(name), list):
            raise ValueError(f"Invalid {name} response; metrics UNKNOWN")
        for field in ("count", "uniques"):
            if not isinstance(value.get(field), int) or value[field] < 0:
                raise ValueError(f"Invalid {name}.{field}; metrics UNKNOWN")
        timestamps = sorted(row["timestamp"] for row in value[name])
        bounds[name] = {"first_returned_bucket_utc": timestamps[0] if timestamps else None,
                        "last_returned_bucket_utc": timestamps[-1] if timestamps else None}
    repo = raw["repository"]
    counters = {key: repo[key] for key in ("stargazers_count", "forks_count", "subscribers_count")}
    for name in ("paths", "referrers"):
        if not isinstance(raw[name], list):
            raise ValueError(f"Invalid {name} response; metrics UNKNOWN")
    return {"schema_version": 1, "repository": repository,
            "observed_at_utc": observed_at.isoformat().replace("+00:00", "Z"),
            "window": {"kind": "github_rolling_14_days", "returned_bucket_bounds": bounds,
                       "unique_counts_are_not_additive": True,
                       "note": "Rolling totals overlap across archives; returned bounds do not prove coverage of omitted days."},
            "counters": counters, "raw": raw}


def archive(snapshot, directory):
    """Atomic publish via hard link: a concurrent writer cannot replace an archive."""
    directory = Path(directory)
    directory.mkdir(parents=True, exist_ok=True)
    day = snapshot["observed_at_utc"][:10]
    target = directory / f"{day}.json"
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode="w", dir=directory, delete=False) as handle:
            temporary = Path(handle.name)
            json.dump(snapshot, handle, indent=2)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.link(temporary, target)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
    return target


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default="FlorianBruniaux/claude-code-ultimate-guide")
    parser.add_argument("--output", default="data/github-traffic")
    args = parser.parse_args()
    try:
        print(archive(collect(args.repo), args.output))
    except (RuntimeError, ValueError, KeyError, FileExistsError, json.JSONDecodeError) as error:
        parser.exit(1, f"Archive not written: {error}\n")


if __name__ == "__main__":
    main()
