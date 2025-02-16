import { test, expect } from '@playwright/test';

test('api tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/api');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('api.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});
