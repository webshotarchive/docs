import { test, expect } from '@playwright/test';

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
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Wait for all img elements to be visible
  await page.waitForSelector('img', { state: 'visible', timeout: 5000 });

  // Wait specifically for the GitHub PR screenshots image
  await page.waitForSelector('img[alt="Github PR Screenshots"]', {
    state: 'visible',
    timeout: 5000,
  });

  await page.waitForSelector('img[alt="Github PR Diff"]', {
    state: 'visible',
    timeout: 5000,
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  // Optional: Add a small delay
  await page.waitForTimeout(1000);

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
  await page.waitForTimeout(1000);

  const screenshotPath = testInfo.outputPath('recipes.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
});
// /docs/recipes/push-pr-action
