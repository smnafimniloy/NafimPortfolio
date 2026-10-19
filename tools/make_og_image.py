"""Make public/og-image.jpg, the 1200x630 picture shown when your link is shared
(LinkedIn, WhatsApp, X, Slack, Google Discover…), in the site's "Press Kit" style.

Run it again after you change your name, subtitle or headshot:
    python tools/make_og_image.py
(Run `npm install` first: the fonts come from node_modules/@fontsource.)
"""

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules" / "@fontsource"
OUT = ROOT / "public" / "og-image.jpg"

INK, WHITE, NEWSPRINT, FOIL = "#121212", "#FFFFFF", "#F1F1F1", "#E1E1E1"


def content_value(key: str, file: str = "profile.js") -> str:
    """Read a simple `key: "value"` from a content/*.js file (no JS runtime needed)."""
    text = (ROOT / "content" / file).read_text(encoding="utf-8")
    match = re.search(rf'^\s*{key}:\s*"([^"]*)"', text, re.M)
    return match.group(1) if match else ""


def interests(limit: int = 3) -> list[str]:
    """First few entries of `interests: [...]` in content/profile.js."""
    text = (ROOT / "content" / "profile.js").read_text(encoding="utf-8")
    block = re.search(r"interests:\s*\[(.*?)\]", text, re.S)
    return re.findall(r'"([^"]+)"', block.group(1))[:limit] if block else []


def font(family: str, file: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / family / "files" / file), size)


def sparkle(draw: ImageDraw.ImageDraw, cx: float, cy: float, r: float):
    """Four-pointed sparkle, like the dividers on the site."""
    k = r * 0.18
    draw.polygon([(cx, cy - r), (cx + k, cy - k), (cx + r, cy), (cx + k, cy + k),
                  (cx, cy + r), (cx - k, cy + k), (cx - r, cy), (cx - k, cy - k)], fill=INK)


def fit(draw, text, family, file, max_w, start):
    """Largest font size (from `start` down) at which `text` fits in `max_w`."""
    size = start
    while size > 40 and draw.textlength(text, font=font(family, file, size)) > max_w:
        size -= 4
    return font(family, file, size)


def main():
    name = content_value("name")
    subtitle = content_value("subtitle")
    headshot = content_value("headshot")
    availability = content_value("availability")
    host = re.sub(r"^https?://|/.*$", "", content_value("url", "site.js"))

    img = Image.new("RGB", (1200, 630), WHITE)
    draw = ImageDraw.Draw(img)

    mono = font("space-mono", "space-mono-latin-400-normal.woff", 22)
    bold = "inter-latin-700-normal.woff"

    # [ AVAILABILITY ]
    if availability:
        draw.text((64, 56), f"[ {availability.upper()} ]", font=mono, fill=INK)

    # Oversized all-caps name: last name on its own line
    words = name.upper().split()
    lines = [" ".join(words[:-1]), words[-1]] if len(words) > 1 else words
    big = min((fit(draw, line, "inter", bold, 760, 150) for line in lines), key=lambda f: f.size)
    y = 104
    for line in lines:
        draw.text((58, y), line, font=big, fill=INK)
        y += int(big.size * 0.98)

    draw.text((64, y + 16), f"[{subtitle.upper()}]", font=mono, fill=INK)

    # Avatar on a newsprint disc with an ink hairline
    if headshot:
        disc = (880, 150, 1136, 406)
        draw.ellipse(disc, fill=NEWSPRINT, outline=INK, width=2)
        face = Image.open(ROOT / "public" / headshot.lstrip("/")).convert("RGBA")
        if face.getchannel("A").getextrema()[0] == 255:
            # A normal photo: fill the circle (centre-crop to a square, round mask)
            side = min(face.size)
            face = face.crop(((face.width - side) // 2, 0, (face.width + side) // 2, side)).resize((252, 252), Image.LANCZOS)
            mask = Image.new("L", face.size, 0)
            ImageDraw.Draw(mask).ellipse((0, 0, 251, 251), fill=255)
            img.paste(face, (882, 152), mask)
            draw.ellipse(disc, outline=INK, width=2)
        else:
            # A cut-out (transparent) avatar: sit it inside the disc
            face.thumbnail((226, 226), Image.LANCZOS)
            img.paste(face, (1008 - face.width // 2, 278 - face.height // 2), face)

    # Sparkle row + footer strip
    for i in range(5):
        sparkle(draw, 880 + i * 64, 470, 10)
    draw.line((64, 530, 1136, 530), fill=INK, width=2)
    small = font("space-mono", "space-mono-latin-400-normal.woff", 18)
    draw.text((64, 556), host.upper(), font=small, fill=INK)
    topics = interests()
    while topics and draw.textlength("[" + " · ".join(topics).upper() + "]", font=small) > 760:
        topics.pop()
    tagline = "[" + " · ".join(topics).upper() + "]" if topics else ""
    draw.text((1136 - draw.textlength(tagline, font=small), 556), tagline, font=small, fill=INK)

    img.save(OUT, "JPEG", quality=90, optimize=True, progressive=True)
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
