import { test, expect } from '@playwright/test';
import { waitForImageLoad } from './test.utils';
test('into tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/intro');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('intro.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('credentials tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/tutorial-basics/create-client-credentials');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('credentials.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('uploading tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/tutorial-basics/setting-up-screenshots-with-cypress');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');

  // Scroll to bottom of page to trigger lazy loading

  // Wait for all img elements to be visible
  await page.waitForSelector('img', { state: 'visible', timeout: 5000 });

  // First scroll to where the image should be

  // Wait for network idle to ensure all resources are loaded
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // await page.evaluate(() => window.scrollTo(0, 0));
  // Use the new function
  await waitForImageLoad(page, {
    selectors: [
      'img[alt="Project ID"]',
      'img[src*="gha-project-id"]',
      'img[alt="Github PR Screenshots"]',
      'img[alt="Github PR Diff"]',
    ],
    timeout: 5000,
    debugLog: true,
  });

  // Optional: Add a small delay
  // await page.waitForTimeout(3000);

  await page.evaluate(() => window.scrollTo(0, 0));

  await page.waitForLoadState('networkidle');

  const screenshotPath = testInfo.outputPath('uploading.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('account tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/tutorial-webshotarchive-ui/account');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('account.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('project settings tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/tutorial-webshotarchive-ui/project-settings');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('project-settings.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('project tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/tutorial-webshotarchive-ui/project');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('project.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});

test('recipes tags-[tutorial]', async ({ page }, testInfo) => {
  await page.goto('/docs/recipes/push-pr-action');

  // Wait for all images on the page to load
  await page.waitForLoadState('networkidle');
  // Optional: Add a small delay to ensure any lazy-loaded images or animations are complete

  await waitForImageLoad(page, {
    selectors: [
      'img[alt="Push"]',
      'img[alt="Pull Request"]',
      'img[alt="comment"]',
    ],
    timeout: 5000,
    debugLog: false,
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  const screenshotPath = testInfo.outputPath('recipes.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});
// /docs/recipes/push-pr-action
