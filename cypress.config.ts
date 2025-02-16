import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    screenshotsFolder: 'dist/cypress',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1600,
    viewportHeight: 1200,
  },
});
