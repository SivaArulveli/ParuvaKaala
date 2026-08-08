import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URL = 'http://localhost:3000/';
const OUT = path.resolve('paruvakala_assets');

if (!fs.existsSync(OUT)) {
  fs.mkdirSync(OUT, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // 01 - Full page
  console.log('Capturing 01_full_page.png...');
  await page.screenshot({
    path: path.join(OUT, '01_full_page.png'),
    fullPage: true
  });

  // 02 - Platform view
  console.log('Capturing 02_platform_view.png...');
  await page.screenshot({ path: path.join(OUT, '02_platform_view.png') });

  // 03 - Hero / Location
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  console.log('Capturing 03_hero_location.png...');
  await page.screenshot({ path: path.join(OUT, '03_hero_location.png') });

  // 04 - Crop Selection
  console.log('Scrolling to Crop Selection...');
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  console.log('Capturing 04_crop_selection.png...');
  await page.screenshot({ path: path.join(OUT, '04_crop_selection.png') });

  // 05 - Technology Engine
  console.log('Scrolling to Technology section...');
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(500);
  console.log('Capturing 05_technology_engine.png...');
  await page.screenshot({ path: path.join(OUT, '05_technology_engine.png') });

  // 06 - Dashboard view after plan generation
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  const genBtn = page.locator("button:has-text('Generate Cultivation Plan')").first();
  if (await genBtn.count() > 0) {
    console.log('Clicking Generate Cultivation Plan...');
    await genBtn.click();
    await page.waitForTimeout(5000);
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(1000);
    console.log('Capturing 06_dashboard_plan.png...');
    await page.screenshot({ path: path.join(OUT, '06_dashboard_plan.png'), fullPage: true });
  }

  await browser.close();
  console.log(`\nSuccessfully saved screenshots to: ${OUT}`);
}

capture().catch(err => {
  console.error('Capture error:', err);
});
