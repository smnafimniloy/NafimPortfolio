"""Make public/og-image.jpg, the 1200x630 picture shown when your link is shared
(LinkedIn, WhatsApp, X, Slack, Google Discover…).

Run it again after you change your name, subtitle or headshot:
    python tools/make_og_image.py
"""

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "node_modules" / "@fontsource"
OUT = ROOT / "public" / "og-image.jpg"

PAPER, SUNK, INK, CLAY, MOSS, MUTED, LINE = "#F4EFE6", "#EAE2D3", "#1F1B16", "#A84A28", "#5E6B3A", "#5C5347", "#D6CCBA"


def content_value(key: str) -> str:
    """Read a simple `key: "value"` from content/profile.js (no JS runtime needed)."""
    text = (ROOT / "content" / "profile.js").read_text(encoding="utf-8")
    match = re.search(rf'^\s*{key}:\s*"([^"]*)"', text, re.M)
    return match.group(1) if match else ""


def font(family: str, file: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / family / "files" / file), size)


def main():
    name = content_value("name")
    subtitle = content_value("subtitle")
    headshot = content_value("headshot")

    img = Image.new("RGB", (1200, 630), PAPER)
    draw = ImageDraw.Draw(img)

    # soft blob, top right
    blob = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(blob).ellipse((760, -120, 1320, 440), fill=(168, 74, 40, 28))
    img.paste(blob, mask=blob)

    serif = font("playfair-display", "playfair-display-latin-700-normal.woff", 78)
    serif_i = font("playfair-display", "playfair-display-latin-700-italic.woff", 78)
    mono = font("space-mono", "space-mono-latin-400-normal.woff", 26)
    mono_b = font("space-mono", "space-mono-latin-700-normal.woff", 22)

    # status line
    draw.ellipse((80, 112, 96, 128), fill=MOSS)
    draw.text((112, 104), "OPEN TO RESEARCH & JOB OPPORTUNITIES", font=mono_b, fill=MOSS)

    # name: last word in terracotta italic
    *first, last = name.split(" ")
    lead = " ".join(first) + " "
    draw.text((76, 160), lead, font=serif, fill=INK)
    lead_w = draw.textlength(lead, font=serif)
    if lead_w > 640:  # long names: put the last word on its own line
        draw.text((76, 250), last, font=serif_i, fill=CLAY)
        y = 370
    else:
        draw.text((76 + lead_w, 160), last, font=serif_i, fill=CLAY)
        y = 280

    draw.text((80, y), subtitle, font=mono, fill=MUTED)
    draw.line((80, 520, 1120, 520), fill=LINE, width=2)
    draw.text((80, 545), "nafim.dev", font=mono_b, fill=INK)
    draw.text((1120 - draw.textlength("GNNs · Medical imaging · Bengali NLP", font=mono_b), 545),
              "GNNs · Medical imaging · Bengali NLP", font=mono_b, fill=MUTED)

    # avatar on a paper disc
    if headshot:
        disc = (850, 150, 1110, 410)
        draw.ellipse(disc, fill=SUNK, outline=LINE, width=2)
        face = Image.open(ROOT / "public" / headshot.lstrip("/")).convert("RGBA")
        face.thumbnail((236, 236), Image.LANCZOS)
        img.paste(face, (980 - face.width // 2, 280 - face.height // 2), face)

    img.save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"Wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
