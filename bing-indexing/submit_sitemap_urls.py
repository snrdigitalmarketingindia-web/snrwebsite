"""
Bing Webmaster API — URL Batch Submitter
Reads sitemap.xml, prioritises today's lastmod pages, caps at 100 URLs/day.
API docs: https://learn.microsoft.com/en-us/dotnet/api/microsoft.bing.webmaster.api
"""

import os
import sys
import xml.etree.ElementTree as ET
from datetime import date, datetime, timezone
import requests

# ── Config ────────────────────────────────────────────────────────────────────
BING_API_KEY  = os.environ.get("BING_API_KEY", "")
SITEMAP_URL   = os.environ.get("SITEMAP_URL", "https://www.snrdigitalmarketing.com/sitemap.xml")
SITE_URL      = os.environ.get("SITE_URL",    "https://www.snrdigitalmarketing.com")
DAILY_LIMIT   = 100          # Bing free quota
BATCH_SIZE    = 100          # max per API call
BING_ENDPOINT = (
    "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch"
    f"?apikey={BING_API_KEY}"
)

# ── Sitemap helpers ───────────────────────────────────────────────────────────

NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

def fetch_sitemap(url: str) -> list[dict]:
    """Fetch sitemap XML and return list of {url, lastmod}."""
    print(f"Fetching sitemap: {url}")
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    root = ET.fromstring(resp.content)

    urls: list[dict] = []

    # Handle sitemap index (nested sitemaps)
    for sitemap in root.findall("sm:sitemap", NS):
        loc = sitemap.findtext("sm:loc", namespaces=NS)
        if loc:
            urls.extend(fetch_sitemap(loc))

    # Handle regular urlset
    for url_el in root.findall("sm:url", NS):
        loc     = url_el.findtext("sm:loc",     namespaces=NS)
        lastmod = url_el.findtext("sm:lastmod", namespaces=NS)
        if loc:
            urls.append({"url": loc, "lastmod": lastmod or ""})

    return urls


def prioritise(entries: list[dict]) -> list[str]:
    """Sort: today's lastmod first, then newest-to-oldest, then rest."""
    today = date.today().isoformat()

    def sort_key(e: dict):
        lm = e["lastmod"][:10] if e["lastmod"] else ""
        if lm == today:
            return (0, lm)
        elif lm:
            return (1, lm)
        return (2, "")

    sorted_entries = sorted(entries, key=sort_key, reverse=False)
    # Reverse within groups so newest non-today comes first
    today_urls = [e["url"] for e in sorted_entries if (e["lastmod"] or "")[:10] == today]
    dated_urls = [e["url"] for e in sorted_entries
                  if (e["lastmod"] or "")[:10] not in ("", today)]
    dated_urls.sort(key=lambda e: next(
        (x["lastmod"] for x in sorted_entries if x["url"] == e), ""), reverse=True)
    no_date    = [e["url"] for e in sorted_entries if not e["lastmod"]]

    return (today_urls + dated_urls + no_date)[:DAILY_LIMIT]


# ── Bing submission ───────────────────────────────────────────────────────────

def submit_batch(urls: list[str]) -> dict:
    payload = {
        "siteUrl":  SITE_URL,
        "urlList":  urls,
    }
    headers = {"Content-Type": "application/json; charset=utf-8"}
    resp = requests.post(BING_ENDPOINT, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.json()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    if not BING_API_KEY:
        print("ERROR: BING_API_KEY environment variable is not set.")
        sys.exit(1)

    print(f"Site : {SITE_URL}")
    print(f"Date : {date.today().isoformat()}")
    print()

    # Fetch + prioritise
    entries    = fetch_sitemap(SITEMAP_URL)
    print(f"Found {len(entries)} URLs in sitemap.")

    priority_urls = prioritise(entries)
    print(f"Submitting {len(priority_urls)} URLs (capped at {DAILY_LIMIT}/day).")
    print()

    # Submit in batches
    submitted = 0
    errors    = 0

    for i in range(0, len(priority_urls), BATCH_SIZE):
        batch = priority_urls[i : i + BATCH_SIZE]
        try:
            result = submit_batch(batch)
            d = result.get("d", {})
            err = d.get("ErrorCode", 0) if isinstance(d, dict) else 0
            if err == 0:
                print(f"  Batch {i//BATCH_SIZE + 1}: ✅ {len(batch)} URLs submitted successfully.")
                submitted += len(batch)
            else:
                print(f"  Batch {i//BATCH_SIZE + 1}: ⚠️  API error code {err} — {d}")
                errors += len(batch)
        except requests.HTTPError as e:
            print(f"  Batch {i//BATCH_SIZE + 1}: ❌ HTTP {e.response.status_code} — {e.response.text[:200]}")
            errors += len(batch)
        except Exception as e:
            print(f"  Batch {i//BATCH_SIZE + 1}: ❌ Unexpected error — {e}")
            errors += len(batch)

    print()
    print(f"Done. Submitted: {submitted} | Errors: {errors}")

    if errors > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
