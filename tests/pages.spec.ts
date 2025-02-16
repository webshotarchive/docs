import { test, expect } from '@playwright/test';

test('tags-[page]', async ({ page }, testInfo) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('heading', { name: 'Webshot Archive Docs' }).click();
  expect(
    page.getByRole('heading', { name: 'Webshot Archive Docs' })
  ).toContainText('Webshot Archive Docs');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('homepage.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});
