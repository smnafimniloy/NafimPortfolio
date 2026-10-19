"""Make the browser-tab and home-screen icons from your avatar.

    python tools/make_favicons.py                    # uses public/avatar.png (or avatar.webp)
    python tools/make_favicons.py public/other.png   # any other picture

Writes to public/: favicon.ico (16/32/48), icon-192.png, icon-512.png,
apple-touch-icon.png (180, on white) and site.webmanifest.
"""

import json
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"


def source() -> Path:
    if len(sys.argv) > 1:
        return Path(sys.argv[1]).resolve()
    for name in ("avatar.png", "avatar.webp"):
        if (PUBLIC / name).exists():
            return PUBLIC / name
    sys.exit("No avatar found. Pass an image: python tools/make_favicons.py public/photo.png")


def squared(img: Image.Image, margin: float) -> Image.Image:
    """Trim transparent edges, then centre on a transparent square with a small margin."""
    img = img.convert("RGBA")
    if img.getchannel("A").getextrema()[0] < 255:
        img = img.crop(img.getbbox())
    side = int(max(img.size) * (1 + 2 * margin))
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(img, ((side - img.width) // 2, (side - img.height) // 2), img)
    return canvas


def site_name() -> tuple[str, str]:
    text = (ROOT / "content" / "profile.js").read_text(encoding="utf-8")
    get = lambda key: (re.search(rf'^\s*{key}:\s*"([^"]*)"', text, re.M) or [None, ""])[1]
    return get("name"), get("shortName") or get("name")


def main():
    src = source()
    icon = squared(Image.open(src), margin=0.04)

    icon.resize((48, 48), Image.LANCZOS).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    for size in (192, 512):
        icon.resize((size, size), Image.LANCZOS).save(PUBLIC / f"icon-{size}.png", optimize=True)

    # iOS fills transparency with black, so the home-screen icon sits on white
    touch = Image.new("RGB", (180, 180), "#FFFFFF")
    small = squared(Image.open(src), margin=0.12).resize((180, 180), Image.LANCZOS)
    touch.paste(small, (0, 0), small)
    touch.save(PUBLIC / "apple-touch-icon.png", optimize=True)

    name, short = site_name()
    manifest = {
        "name": name,
        "short_name": short,
        "icons": [
            {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"},
        ],
        "theme_color": "#FFFFFF",
        "background_color": "#FFFFFF",
        "display": "browser",
    }
    (PUBLIC / "site.webmanifest").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Icons made from {src.relative_to(ROOT)}: favicon.ico, icon-192.png, icon-512.png, apple-touch-icon.png, site.webmanifest")


if __name__ == "__main__":
    main()
