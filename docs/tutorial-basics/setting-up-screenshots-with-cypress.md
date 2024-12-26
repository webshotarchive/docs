---
sidebar_position: 3
---

# Setting up Screenshots with Cypress

After [setting up your API User](/docs/tutorial-basics/create-client-credentials) and [updating your Github Actions workflow](/docs/tutorial-basics/add-github-action-step), you can run cypress, playwright, or other e2e testing tool the Github Action for a Pull Request. The action will upload the screenshots to the Webshot Archive API and comment on the Pull Request with the results.

This section of the tutorial will guide you through:

- setting up cypress.io to capture screenshots
- running the cypress.io tests with the Github Action
- validating the screenshots on the Github PR
- running the Github Action on push to the `main` branch

You can find the Github Action code that run on pull request [here](https://github.com/toshimoto821/webshot-archive-docs/blob/main/.github/workflows/pr.yml) and the Github Action code that run on push to the `main` branch [here](https://github.com/toshimoto821/webshot-archive-docs/blob/main/.github/workflows/main.yml).

:::tip
For comparision screenshots you will need to have a main branch or base branch that has the screenshots. Webshot Archive stores images with their commit hash so if you want to compare screenshots from a PR to the main branch, you will need to have the screenshots from the main branch saved.
:::

## Cypress Configuration

:::tip
Skip to [step 6](#step-6---configure--run-the-github-actions) if you are using a different e2e testing tool or already have a cypress configuration.
:::

### Step 1 - Install Cypress

```bash
npm install cypress --save-dev
```

### Step 2 - Add Cypress Configuration

```ts title="cypress.config.ts"
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // update according to how your test run
    screenshotsFolder: "dist/cypress",
  },
});
```

### Step 3 - Add Cypress Test

:::tip
cypress.io has [a great tutorial](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test) on how to write tests with cypress.
:::

```ts title="cypress/e2e/1-getting-started/todo.cy.js"
describe("Homepage", () => {
  it("should have the correct title", () => {
    cy.visit("/");
    cy.get("<some selector>").should("have.text", "<some text>");
    cy.screenshot({
      capture: "fullPage",
    });
  });
});
```

### Step 4 - Setup npm script

```json title="package.json"
"scripts": {
  "cypress:e2e": "npx start-server-and-test serve http://localhost:3000 'cypress run --e2e'"
}
```

:::tip
The [`start-server-and-test`](https://www.npmjs.com/package/start-server-and-test) package is used to start the server and run the cypress tests. You can install it locally as a dev dependency rather than using npx if you prefer.
:::

### Step 5 - Validate setup locally

```bash
npm run cypress:e2e
```

### Step 6 - Configure & run the Github Actions

You should have at least two github actions workflows that upload the screenshots to the Webshot Archive API. One for pull requests and one for pushes to the `main` branch.
Every time you run the Github Action, it will upload the screenshots to the Webshot Archive API and associate the screenshot with the commit hash. When you raise a new PR, the Github Action will compare the screenshot found in the base branch.

```yaml title=".github/workflows/pr.yml"
name: Pull Request Screenshots

on:
  pull_request:

permissions:
  actions: read
  contents: read
  issues: write
  pull-requests: write

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      # Cache node_modules
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies using pnpm
        run: npm ci

      - name: Build
        run: npm run build

      - name: Screenshots
        run: npm run cypress:e2e
        continue-on-error: true
        id: screenshots

      - name: WebshotArchive Action
        uses: toshimoto821/webshotarchive@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          screenshotsFolder: dist/cypress
          clientId: ${{ secrets.WA_CLIENT_ID }}
          clientSecret: ${{ secrets.WA_CLIENT_SECRET }}
          projectId: ${{secrets.WA_PROJECT_ID}}

      - name: Check if screenshots failed
        if: steps.screenshots.outcome == 'failure'
        run: exit 1
```

:::tip
The `continue-on-error: true` option is used to allow the Github Action to continue running even if the screenshots fail. This is useful if you want to run the Github Action, upload the screenshots to the Webshot Archive API and comment on the PR with the results.
:::

```yaml title=".github/workflows/main.yml"
name: Main Branch Screenshots

on:
  push:
    branches:
      - main

permissions:
  actions: read
  contents: read
  issues: write
  pull-requests: write

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      # Cache node_modules
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies using pnpm
        run: npm ci

      - name: Build
        run: npm run build

      - name: Screenshots
        run: npm run cypress:e2e
        continue-on-error: true
        id: screenshots

      - name: WebshotArchive Action
        uses: toshimoto821/webshotarchive@main
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          screenshotsFolder: dist/cypress
          clientId: ${{ secrets.WA_CLIENT_ID }}
          clientSecret: ${{ secrets.WA_CLIENT_SECRET }}
          projectId: ${{secrets.WA_PROJECT_ID}}

      - name: Check if screenshots failed
        if: steps.screenshots.outcome == 'failure'
        run: exit 1
```

After the PR is merged, the main branch screenshots will be generated and uploaded to the Webshot Archive API.

### Step 7 - Validate setup on Github PR

Once the action runs, you should see a comment with the new screenshots in the PR as shown below and on [this PR](https://github.com/toshimoto821/webshot-archive-docs/pull/1).

![Github PR Screenshots](/img/screenshots/gha-screenshot-new.png)

Once merged, the main branch screenshots will be uploaded to the Webshot Archive API and you will be able to see a comparison of the screenshots from the base or main branch and the PR on any new PRs raised (as shown below and in [this pr](https://github.com/toshimoto821/webshot-archive-docs/pull/2)).

![Github PR Screenshots](/img/screenshots/gha-screenshot-compare.png)
