"""Gera public/og.png (1200x630) a partir de scripts/og.html. Uso: python3 scripts/og.py"""
from pathlib import Path
from playwright.sync_api import sync_playwright
root = Path(__file__).resolve().parent.parent
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.goto((root / "scripts/og.html").as_uri()); pg.wait_for_timeout(500)
    pg.screenshot(path=str(root / "public/og.png"))
    b.close()
