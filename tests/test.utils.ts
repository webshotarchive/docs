import type { Page } from '@playwright/test';

export async function waitForImageLoad(
  page: Page,
  options: {
    selectors: string[];
    timeout?: number;
    debugLog?: boolean;
  }
) {
  const { selectors, timeout = 5000, debugLog = false } = options;

  await page.evaluate((selectors) => {
    const elements = selectors.map((selector) =>
      document.querySelector(selector)
    );
    for (const element of elements) {
      if (element) {
        element.scrollIntoView();
        return;
      }
    }
  }, selectors);

  if (debugLog) {
    // Log all images and their loading state
    const imageStates = await page.$$eval('img', (imgs) =>
      imgs.map((img) => ({
        src: img.getAttribute('src'),
        alt: img.getAttribute('alt'),
        loading: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      }))
    );
    console.log('Image states:', imageStates);
  }

  for (const selector of selectors) {
    try {
      const img = await page.waitForSelector(selector, {
        state: 'visible',
        timeout,
      });
      if (img) {
        if (debugLog) {
          console.log(`Found image with selector: ${selector}`);
        }
        // Wait for the image to be fully loaded
        await img.evaluate((el) => {
          return new Promise((resolve) => {
            if ((el as HTMLImageElement).complete) {
              resolve(true);
            } else {
              el.addEventListener('load', () => resolve(true));
              el.addEventListener('error', () => resolve(false));
            }
          });
        });

        // Verify the image loaded successfully
        const isLoaded = await img.evaluate(
          (el) =>
            (el as HTMLImageElement).complete &&
            (el as HTMLImageElement).naturalWidth > 0
        );

        if (isLoaded) {
          if (debugLog) {
            console.log('Image is fully loaded');
          }
          continue; // Continue to next selector instead of returning
        } else if (debugLog) {
          console.log(`Image found but not loaded: ${selector}`);
        }
      }
    } catch (e) {
      if (debugLog) {
        console.log(`Selector ${selector} failed:`, e.message);
      }
    }
  }

  // Only return true if we've successfully waited for all images
  return selectors.length > 0;
}
