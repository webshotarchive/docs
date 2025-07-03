import { test, expect } from '@playwright/test';

test('first post tags-[page]', async ({ page }, testInfo) => {
  await page.goto('/blog/first-blog-post');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('first-blog-post.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('diffs tags-[blog]', async ({ page }, testInfo) => {
  await page.goto('/blog/diffs');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('image-diffing.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('github actions tags-[blog]', async ({ page }, testInfo) => {
  await page.goto('/blog/github-actions');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('github-actions.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('how to share tags-[blog]', async ({ page }, testInfo) => {
  await page.goto('/blog/how-to-share');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  await expect(page.getByRole('img', { name: 'Request Access' })).toBeVisible();

  const screenshotPath = testInfo.outputPath('how-to-share.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('test page', async ({ page }, testInfo) => {
  await page.goto('/docs/tutorial-basics/test');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  // await expect(page.getByRole('img', { name: 'Request Access' })).toBeVisible();
  // build
  const screenshotPath = testInfo.outputPath('test-page.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});
