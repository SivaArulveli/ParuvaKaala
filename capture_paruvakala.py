from pathlib import Path
from playwright.sync_api import sync_playwright
import time

URL = "http://localhost:3000/"
OUT = Path("paruvakala_assets")
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(
        viewport={"width": 1440, "height": 900},
        device_scale_factor=2
    )

    print("Navigating to ParuvaKaala...")
    page.goto(URL, wait_until="domcontentloaded", timeout=30000)
    page.wait_for_timeout(3000)

    # 01 - Full page screenshot
    print("Capturing 01_full_page.png...")
    page.screenshot(
        path=str(OUT / "01_full_page.png"),
        full_page=True
    )

    # 02 - Platform overview (top viewport)
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(600)
    print("Capturing 02_platform_view.png...")
    page.screenshot(path=str(OUT / "02_platform_view.png"))

    # 03 - Hero + location selector
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(400)
    print("Capturing 03_hero_location.png...")
    page.screenshot(path=str(OUT / "03_hero_location.png"))

    # 04 - Crop selection section — scroll to it
    print("Scrolling to crop section...")
    page.evaluate("window.scrollTo(0, 900)")
    page.wait_for_timeout(800)
    print("Capturing 04_crop_selection.png...")
    page.screenshot(path=str(OUT / "04_crop_selection.png"))

    # 05 - Technology / How it works section
    print("Scrolling to technology section...")
    page.evaluate("window.scrollTo(0, 1600)")
    page.wait_for_timeout(800)
    print("Capturing 05_technology_engine.png...")
    page.screenshot(path=str(OUT / "05_technology_engine.png"))

    # 06 - Generate the cultivation plan and capture dashboard
    print("Triggering Generate Cultivation Plan...")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)

    # Click the Generate button
    gen_btn = page.locator("button:has-text('Generate Cultivation Plan')").first
    if gen_btn.count() > 0:
        gen_btn.click()
        page.wait_for_timeout(5000)   # wait for plan generation + animation
        page.evaluate("window.scrollTo(0, 800)")
        page.wait_for_timeout(1000)
        print("Capturing 06_dashboard_plan.png...")
        page.screenshot(path=str(OUT / "06_dashboard_plan.png"), full_page=True)
    else:
        print("Generate button not found — skipping dashboard capture")

    browser.close()

print(f"\nAll screenshots saved to: {OUT.resolve()}")
