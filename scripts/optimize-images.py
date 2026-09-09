from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def export(source: str, target: str, width: int, quality: int = 88) -> None:
    src = Image.open(ASSETS / source).convert("RGBA")
    height = round(src.height * width / src.width)
    resized = src.resize((width, height), Image.Resampling.LANCZOS)
    resized.save(ASSETS / target, "WEBP", quality=quality, method=6)
    print(f"{target}: {width}x{height}")


for source, stem in [
    ("project-listing-packages.png", "project-listing-packages"),
    ("project-a-plus-content.png", "project-a-plus-content"),
]:
    export(source, f"{stem}-700.webp", 700, 86)
    export(source, f"{stem}-1400.webp", 1400, 88)

export("project-brand-system.png", "project-brand-system-900.webp", 900, 88)
export("project-brand-system.png", "project-brand-system-1400.webp", 1400, 90)
export("project-brand-system.png", "hero-amazon-design-1600.webp", 1440, 90)
export("project-brand-guide.png", "project-brand-guide-1200.webp", 1100, 88)
export("project-brand-guide2.png", "project-brand-guide2-1200.webp", 1100, 88)
export("logo.png", "logo-480.webp", 480, 90)
export("isotipo.png", "isotipo-512.webp", 512, 90)
export("isotipo.png", "favicon-192.webp", 192, 90)

for icon in ["listing", "content", "brand", "store"]:
    export(f"icon-{icon}.png", f"icon-{icon}-256.webp", 256, 88)
