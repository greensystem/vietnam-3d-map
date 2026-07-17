// Quay video demo 2K → WebM (Playwright tự mux).
// Cách dùng:
//   Tour hover:      node record-demo.mjs
//   Tàu Thống Nhất:  node record-demo.mjs "http://localhost:4173/?train=1" 82000
import { chromium } from 'playwright';

const W = 2560, H = 1440;
const URL = process.argv[2] ?? 'http://localhost:4173/?demo=1';
const DURATION_MS = Number(process.argv[3] ?? 57000);
const OUT_DIR = new URL('./video-out/', import.meta.url).pathname;

const browser = await chromium.launch({
  headless: false, // headed = WebGL chạy GPU thật, khung hình mượt
  args: [`--window-size=${W},${H + 80}`, '--hide-scrollbars'],
});
const context = await browser.newContext({
  viewport: { width: W, height: H },
  deviceScaleFactor: 1,
  recordVideo: { dir: OUT_DIR, size: { width: W, height: H } },
});
const page = await context.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });
console.log('recording…');
await page.waitForTimeout(DURATION_MS);
const video = page.video();
await context.close();
console.log('saved:', await video.path());
await browser.close();
