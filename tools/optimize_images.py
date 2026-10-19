"""Shrink photos in public/ so the site loads fast.

Usage (inside the penv):
    python tools/optimize_images.py                 # convert big JPG/PNG/WebP in public/ to WebP
    python tools/optimize_images.py public/me.jpg   # convert specific files
    python tools/optimize_images.py --check         # only report oversized images (used by CI)

Originals are kept; a `.webp` file is written next to each one. Point your
content files (e.g. profile.headshot or a blog post `cover:`) at the new .webp.
"""

import argparse
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
MAX_BYTES = 500 * 1024  # warn above 500 KB
MAX_SIDE = 1600         # longest edge after resizing
QUALITY = 82
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def images(paths):
    if paths:
        return [Path(p).resolve() for p in paths]
    return sorted(p for p in PUBLIC.rglob("*") if p.suffix.lower() in EXTENSIONS)


def is_ignored(path: Path) -> bool:
    """True for originals listed in .gitignore (they never reach GitHub, so CI skips them)."""
    try:
        return subprocess.run(["git", "check-ignore", "-q", str(path)], cwd=ROOT).returncode == 0
    except FileNotFoundError:
        return False


def convert(path: Path) -> Path:
    out = path.with_suffix(".webp")
    if out == path:
        out = path.with_name(f"{path.stem}.min.webp")
    with Image.open(path) as img:
        img = ImageOps.exif_transpose(img)
        img.thumbnail((MAX_SIDE, MAX_SIDE))
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
        img.save(out, "WEBP", quality=QUALITY, method=6)  # drops EXIF/GPS metadata
    return out


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("files", nargs="*", help="images to convert (default: everything in public/)")
    parser.add_argument("--check", action="store_true", help="report images over 500 KB, change nothing")
    args = parser.parse_args()

    big = [p for p in images(args.files) if p.stat().st_size > MAX_BYTES]

    if args.check:
        big = [p for p in big if not is_ignored(p)]
        for p in big:
            kb = p.stat().st_size // 1024
            rel = p.relative_to(ROOT)
            # GitHub Actions shows this as a yellow warning on the run summary.
            print(f"::warning file={rel}::{rel} is {kb} KB. Run `python tools/optimize_images.py {rel}` to shrink it.")
        print(f"Image check: {len(big)} image(s) over {MAX_BYTES // 1024} KB.")
        return 0

    if not big:
        print("All images are already small. Nothing to do.")
    for p in big:
        out = convert(p)
        print(f"{p.relative_to(ROOT)}: {p.stat().st_size // 1024} KB -> {out.relative_to(ROOT)}: {out.stat().st_size // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
