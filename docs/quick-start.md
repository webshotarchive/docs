---
sidebar_position: 2
title: Quick Start Guide
---

# Quick Start Guide

Get Webshot Archive up and running in your project in under 10 minutes.

## Overview

This guide will walk you through:

1. Creating a Webshot Archive account and project
2. Setting up authentication credentials
3. Configuring a basic GitHub Actions workflow
4. Running your first visual regression test

## Step 1: Create Your Account

1. Go to [webshotarchive.com](https://www.webshotarchive.com)
2. Click **"Sign Up"** and create your account
3. Verify your email address

:::tip Free Account
Start with our free tier - you can always upgrade later as your needs grow.
:::

## Step 2: Create a Project

1. After signing in, click **"Create Project"**
2. Give your project a name (e.g., "My Web App")
3. Choose a description (optional)
4. Click **"Create Project"**

You'll be taken to your project dashboard where you can see your project ID and settings.

## Step 3: Set Up Authentication

You need to create API credentials for GitHub Actions to upload screenshots.

### 3.1 Create Service Account

1. Go to your [Account Settings](https://www.webshotarchive.com/account#account-users)
2. Click **"Add User"** → **"Add Service Account User (GitHub Actions)"**
3. Click **"Add Service Account"**

### 3.2 Generate Credentials

1. Find your service account in the users list
2. Click **"View / Add Credentials"**
3. Click **"Create Credentials"**
4. **Copy both the Client ID and Client Secret** (you won't see the secret again!)

### 3.3 Add to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `WEBSHOT_ARCHIVE_CLIENT_ID` = Your Client ID
   - `WEBSHOT_ARCHIVE_CLIENT_SECRET` = Your Client Secret
   - `WEBSHOT_ARCHIVE_PROJECT_ID` = Your Project ID

## Step 4: Set Up Screenshot Capture

Choose your testing framework:

### Option A: Cypress (Recommended)

If you don't have Cypress set up:

```bash
# Install Cypress
pnpm add -D cypress

# Initialize Cypress
npx cypress open
```

Create a basic test in `cypress/e2e/visual.cy.js`:

```javascript
describe('Visual Regression Tests', () => {
  it('should capture homepage screenshot', () => {
    cy.visit('http://localhost:3000');
    cy.wait(1000); // Wait for any animations
    cy.screenshot('homepage');
  });

  it('should capture about page screenshot', () => {
    cy.visit('http://localhost:3000/about');
    cy.wait(1000);
    cy.screenshot('about-page');
  });
});
```

### Option B: Playwright

```bash
# Install Playwright
pnpm add -D @playwright/test

# Initialize Playwright
npx playwright install
```

Create a test in `tests/visual.spec.js`:

```javascript
const { test, expect } = require('@playwright/test');

test('visual regression tests', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/homepage.png' });

  await page.goto('http://localhost:3000/about');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/about-page.png' });
});
```

## Step 5: Install the GitHub App

**⚠️ Critical Step**: To enable the GitHub Action to comment on pull requests, you must install the Webshot Archive GitHub App.

1. Go to [Webshot Archive GitHub App](https://github.com/apps/webshot-archive-github-action/installations/new)
2. Click **"Install"**
3. Select the repositories you want to use with Webshot Archive
4. Click **"Install"** to complete the setup

This gives Webshot Archive the necessary permissions to:

- Read and write access to pull requests
- Read access to metadata

:::tip Required for PR Comments
Without installing the GitHub App, the action will still upload screenshots but won't be able to comment on pull requests with visual diffs.
:::

## Step 6: Create GitHub Actions Workflow

Create `.github/workflows/visual-tests.yml`:

```yaml
name: Visual Regression Tests

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  visual-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: pnpm install

      - name: Start application
        run: pnpm start &
        env:
          CI: true

      - name: Wait for app to be ready
        run: npx wait-on http://localhost:3000

      - name: Run visual tests
        run: pnpm cypress:run
        continue-on-error: true

      - name: Upload to Webshot Archive
        uses: webshotarchive/github-action@v1.1.0
        with:
          screenshotsFolder: cypress/screenshots
          clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
          clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
          projectId: ${{ secrets.WEBSHOT_ARCHIVE_PROJECT_ID }}
```

## Step 7: Test Your Setup

1. **Start your application locally:**

   ```bash
   pnpm start
   ```

2. **Run your visual tests:**

   ```bash
   # For Cypress
   pnpm cypress run

   # For Playwright
   pnpm playwright test
   ```

3. **Create a test pull request:**

   - Make a small change to your app
   - Commit and push to a new branch
   - Create a pull request

4. **Check the results:**
   - The GitHub Action will run automatically
   - You'll see a comment on your PR with visual diffs
   - Visit your Webshot Archive dashboard to see the full history

## What You Should See

### In GitHub Pull Request

- A comment with screenshots and visual diffs
- Only changed components highlighted
- Links to view full-size images

### In Webshot Archive Dashboard

- Timeline of all visual changes
- Side-by-side comparisons
- Filtering by branch, commit, or tags

## Troubleshooting

### Common Issues

**"Screenshots not found"**

- Check the `screenshotsFolder` path in your workflow
- Ensure your tests are actually generating screenshots

**"Authentication failed"**

- Verify your GitHub secrets are correctly named
- Check that the Client ID and Secret are copied exactly

**"No diffs shown"**

- This is normal for the first run - there's nothing to compare against
- Make a visual change and create another PR to see diffs

### Getting Help

- Check the [troubleshooting guide](./troubleshooting)
- Join our [Discord community](https://discord.gg/a9qkpVxPnF)
- Open an issue on [GitHub](https://github.com/webshotarchive/docs)

## Next Steps

Now that you have the basics working:

- [Customize diff thresholds](./api#diff-thresholds)
- [Explore the dashboard](./tutorial-webshotarchive-ui/project)

---

**Need help?** [Join our Discord](https://discord.gg/a9qkpVxPnF) or [check the troubleshooting guide](./troubleshooting).
