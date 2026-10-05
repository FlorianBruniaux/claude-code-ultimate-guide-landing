#!/usr/bin/env python3
import concurrent.futures
import datetime as dt
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("traffic", Path(__file__).with_name("github-traffic.py"))
traffic = importlib.util.module_from_spec(spec)
spec.loader.exec_module(traffic)


def fixture(endpoint):
    if "/traffic/views" in endpoint or "/traffic/clones" in endpoint:
        kind = "views" if "/views" in endpoint else "clones"
        return {"count": 9, "uniques": 4, kind: [
            {"timestamp": "2026-10-03T00:00:00Z", "count": 4, "uniques": 3},
            {"timestamp": "2026-10-04T00:00:00Z", "count": 5, "uniques": 3}]}
    if "/traffic/" in endpoint:
        return []
    return {"stargazers_count": 10, "forks_count": 2, "subscribers_count": 1}


class ArchiveTests(unittest.TestCase):
    def snapshot(self):
        return traffic.collect("owner/repo", fixture, dt.datetime(2026, 10, 5, tzinfo=dt.timezone.utc))

    def test_preserves_window_uniques_and_raw_bucket_bounds(self):
        result = self.snapshot()
        self.assertEqual(result["raw"]["views"]["uniques"], 4)
        self.assertEqual(sum(row["uniques"] for row in result["raw"]["views"]["views"]), 6)
        self.assertEqual(result["window"]["returned_bucket_bounds"]["views"]["first_returned_bucket_utc"], "2026-10-03T00:00:00Z")

    def test_access_failure_creates_no_archive(self):
        def denied(endpoint):
            raise RuntimeError("Access unavailable; UNKNOWN")
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(RuntimeError):
                traffic.archive(traffic.collect("owner/repo", denied), directory)
            self.assertEqual(list(Path(directory).iterdir()), [])

    def test_incomplete_metric_payload_is_not_zero(self):
        def invalid(endpoint):
            return {"message": "Forbidden"} if "/views" in endpoint else fixture(endpoint)
        with self.assertRaises(ValueError):
            traffic.collect("owner/repo", invalid)

    def test_concurrent_archive_cannot_overwrite_first_writer(self):
        with tempfile.TemporaryDirectory() as directory:
            first, second = self.snapshot(), self.snapshot()
            second["counters"]["stargazers_count"] = 999
            def write(snapshot):
                try:
                    return traffic.archive(snapshot, directory)
                except FileExistsError:
                    return None
            with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
                results = list(executor.map(write, [first, second]))
            self.assertEqual(sum(path is not None for path in results), 1)
            files = list(Path(directory).iterdir())
            self.assertEqual(len(files), 1)
            data = json.loads(files[0].read_text())
            self.assertIn(data["counters"]["stargazers_count"], (10, 999))
            before = files[0].read_bytes()
            with self.assertRaises(FileExistsError):
                traffic.archive(self.snapshot(), directory)
            self.assertEqual(files[0].read_bytes(), before)


if __name__ == "__main__":
    unittest.main()
