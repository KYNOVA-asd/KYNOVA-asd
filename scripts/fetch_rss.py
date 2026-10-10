"""Construye el snapshot estático de noticias RSS usado por el blog de KYNOVA."""
from __future__ import annotations
import hashlib, html, json, re
from calendar import timegm
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
import feedparser
import requests

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src" / "scripts" / "data" / "rss-news.json"
MAX_ITEMS, TIMEOUT_SECONDS = 12, 20
FEEDS = {"Xataka": "https://feeds.weblogssl.com/xataka2", "Genbeta": "https://feeds.weblogssl.com/genbeta", "The Verge": "https://www.theverge.com/rss/index.xml", "Engadget": "https://www.engadget.com/rss.xml"}
CATEGORY_KEYWORDS = {
    "Inteligencia Artificial": ("inteligencia artificial", " ia ", "ai ", "openai", "chatgpt", "gemini", "claude"),
    "Marketing": ("marketing", "publicidad", "redes sociales", "instagram", "facebook", "meta ads", "seo"),
    "Desarrollo": ("desarrollo", "programación", "software", "github", "javascript", "python", "web ", "app "),
}

def clean_text(value: str | None, limit: int = 320) -> str:
    text = re.sub(r"<[^>]+>", " ", value or "")
    text = html.unescape(re.sub(r"\s+", " ", text)).strip()
    return text if len(text) <= limit else f"{text[:limit - 1].rsplit(' ', 1)[0]}…"

def canonical_link(value: str) -> str:
    parts = urlsplit(value.strip())
    return urlunsplit((parts.scheme, parts.netloc.lower(), parts.path.rstrip("/"), "", ""))

def published_iso(entry: feedparser.FeedParserDict) -> str:
    parsed = entry.get("published_parsed") or entry.get("updated_parsed")
    return (datetime.fromtimestamp(timegm(parsed), tz=timezone.utc) if parsed else datetime.now(timezone.utc)).isoformat().replace("+00:00", "Z")

def extract_image(entry: feedparser.FeedParserDict) -> str:
    media = entry.get("media_content") or entry.get("media_thumbnail") or []
    if media and media[0].get("url"): return media[0]["url"]
    for enclosure in entry.get("enclosures", []):
        if enclosure.get("type", "").startswith("image/") and enclosure.get("href"): return enclosure["href"]
    content = " ".join(part.get("value", "") for part in entry.get("content", [])) + entry.get("summary", "")
    match = re.search(r'<img[^>]+src=["\']([^"\']+)', content, flags=re.IGNORECASE)
    return html.unescape(match.group(1)) if match else ""

def classify(title: str, summary: str) -> str:
    haystack = f" {title} {summary} ".lower()
    return next((category for category, words in CATEGORY_KEYWORDS.items() if any(word in haystack for word in words)), "Tecnología")

def fetch_source(session: requests.Session, source: str, url: str) -> list[dict[str, str]]:
    response = session.get(url, timeout=TIMEOUT_SECONDS); response.raise_for_status()
    parsed = feedparser.parse(response.content)
    if parsed.bozo and not parsed.entries: raise ValueError(f"Feed inválido: {parsed.bozo_exception}")
    articles = []
    for entry in parsed.entries:
        link, title = canonical_link(entry.get("link", "")), clean_text(entry.get("title"), 180)
        if not link or not title: continue
        summary = clean_text(entry.get("summary") or entry.get("description"))
        articles.append({"id": hashlib.sha256(link.encode()).hexdigest()[:16], "title": title, "summary": summary or "Consulta la noticia completa en el medio original.", "link": link, "published": published_iso(entry), "source": source, "category": classify(title, summary), "imageUrl": extract_image(entry)})
    return articles

def main() -> None:
    session = requests.Session(); session.headers.update({"User-Agent": "KYNOVA-RSS-Radar/1.0 (+https://kynova.mx/blog/)"})
    articles = []
    for source, url in FEEDS.items():
        try:
            articles.extend(fetch_source(session, source, url)); print(f"[ok] {source}")
        except (requests.RequestException, ValueError) as error: print(f"[warning] {source}: {error}")
    latest = sorted({item["link"]: item for item in articles}.values(), key=lambda item: item["published"], reverse=True)[:MAX_ITEMS]
    if not latest: raise RuntimeError("No se obtuvo ninguna noticia; se conserva el JSON anterior.")
    if OUTPUT.exists():
        try:
            previous = json.loads(OUTPUT.read_text(encoding="utf-8"))
            if previous.get("items") == latest:
                print("[done] No hay noticias nuevas.")
                return
        except (json.JSONDecodeError, OSError):
            pass
    payload = {"generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"), "count": len(latest), "items": latest}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True); OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"[done] {len(latest)} noticias guardadas en {OUTPUT.relative_to(ROOT)}")

if __name__ == "__main__": main()
