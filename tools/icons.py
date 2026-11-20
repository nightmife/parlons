"""Génère les icônes de l'app (bulle de dialogue « Aa » sur fond bleu). Usage : python3 tools/icons.py"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "icons"
BG = (43, 79, 216)
FONT = "/usr/share/fonts/croscore/Arimo-Bold.ttf"


def icon(size, maskable=False):
    s = size * 4  # suréchantillonnage pour des bords lisses
    img = Image.new("RGB", (s, s), BG)
    d = ImageDraw.Draw(img)
    k = 0.78 if maskable else 1.0  # zone sûre des icônes masquables
    cx, cy = s / 2, s / 2
    w, h = s * 0.62 * k, s * 0.46 * k
    box = (cx - w / 2, cy - h / 2 - s * 0.04 * k, cx + w / 2, cy + h / 2 - s * 0.04 * k)
    d.rounded_rectangle(box, radius=h * 0.32, fill="white")
    tail = [(cx - w * 0.22, box[3] - 2), (cx - w * 0.30, box[3] + s * 0.11 * k), (cx - w * 0.02, box[3] - 2)]
    d.polygon(tail, fill="white")
    font = ImageFont.truetype(FONT, int(h * 0.62))
    d.text((cx, (box[1] + box[3]) / 2), "Aa", font=font, fill=BG, anchor="mm")
    return img.resize((size, size), Image.LANCZOS)


OUT.mkdir(exist_ok=True)
for n in (180, 192, 512):
    icon(n).save(OUT / f"icon-{n}.png")
icon(512, maskable=True).save(OUT / "icon-maskable-512.png")
print("icônes écrites dans", OUT)
