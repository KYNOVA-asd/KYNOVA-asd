"""Genera el snapshot estático de videos para Tech & Mkt Shorts."""
from __future__ import annotations

import json
import re
from calendar import timegm
from datetime import datetime, timezone
from pathlib import Path

import feedparser
import requests

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src" / "scripts" / "data" / "youtube-videos.json"
FEED_URL = "https://www.youtube.com/feeds/videos.xml?channel_id={}"
MAX_VIDEOS = 12
CHANNELS = {
    "Fireship": {"id": "UCsBjURrPoezykLs9EqgamOA", "category": "Dev"},
    "MiduDev": {"id": "UC3aj05GEEyzdOqYM5FLSFeg", "category": "Dev"},
    "DotCSV": {"id": "UCOTko-zmnQTcOxSRdg5_uOQ", "category": "IA"},
    "Metricool": {"id": "UC0NjePvj-YE5qeysRNfY-gA", "category": "Marketing"},
}


def clean_title(value: str) -> str:
    value = re.sub(r"[\U0001F000-\U0001FAFF\U00002600-\U000027BF]", "", value)
    return re.sub(r"\s+", " ", value).strip()


def published_iso(entry: feedparser.FeedParserDict) -> str:
    parsed = entry.get("published_parsed") or entry.get("updated_parsed")
    moment = datetime.fromtimestamp(timegm(parsed), tz=timezone.utc) if parsed else datetime.now(timezone.utc)
    return moment.isoformat().replace("+00:00", "Z")


def fetch_channel(session: requests.Session, name: str, config: dict[str, str]) -> list[dict[str, str]]:
    response = session.get(FEED_URL.format(config["id"]), timeout=20)
    response.raise_for_status()
    feed = feedparser.parse(response.content)
    if feed.bozo and not feed.entries:
        raise ValueError(f"Feed inválido: {feed.bozo_exception}")

    videos = []
    for entry in feed.entries:
        video_id = entry.get("yt_videoid") or entry.get("id", "").split(":")[-1]
        if not video_id:
            continue
        videos.append(
            {
                "id": video_id,
                "title": clean_title(entry.get("title", "Video sin título")),
                "channelTitle": entry.get("author") or name,
                "published": published_iso(entry),
                "category": config["category"],
                "thumbnailUrl": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
                "videoUrl": f"https://www.youtube.com/watch?v={video_id}",
            }
        )
    return videos


def main() -> None:
    session = requests.Session()
    session.headers.update({"User-Agent": "KYNOVA-YouTube-Radar/1.0 (+https://kynova.mx/blog/)"})
    videos: list[dict[str, str]] = []
    for name, config in CHANNELS.items():
        try:
            videos.extend(fetch_channel(session, name, config))
            print(f"[ok] {name}")
        except (requests.RequestException, ValueError) as error:
            print(f"[warning] {name}: {error}")

    latest = sorted({video["id"]: video for video in videos}.values(), key=lambda video: video["published"], reverse=True)[:MAX_VIDEOS]
    if not latest:
        raise RuntimeError("No se obtuvo ningún video; se conserva el JSON anterior.")

    if OUTPUT.exists():
        try:
            previous = json.loads(OUTPUT.read_text(encoding="utf-8"))
            if previous.get("items") == latest:
                print("[done] No hay videos nuevos.")
                return
        except (json.JSONDecodeError, OSError):
            pass

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "count": len(latest),
        "items": latest,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"[done] {len(latest)} videos guardados en {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
