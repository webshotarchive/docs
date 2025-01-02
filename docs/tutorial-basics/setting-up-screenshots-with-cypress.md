---
sidebar_position: 2
---

# Uploading Screenshots from e2e tests

After setting up the API User ([Create Client Credentials](/docs/tutorial-basics/create-client-credentials)), Github Actions can capture screenshots with [Cypress](https://cypress.io/), [Playwright](https://playwright.dev/), or other e2e testing tools. The Webshot Archive Github Action will upload the screenshots to the Webshot Archive API and comment on the Pull Request showing the image and diffs (if any).

This section of the tutorial will guide you through:

- Setting up cypress.io to capture screenshots
- Running the cypress.io tests with the Github Action
- Validating the screenshots on the Github PR
- Running the Github Action on push to the `main` branch

You can find the Github Action code that run on pull request [here](https://github.com/toshimoto821/webshot-archive-docs/blob/main/.github/workflows/pr.yml) and the Github Action code that run on push to the `main` branch [here](https://github.com/toshimoto821/webshot-archive-docs/blob/main/.github/workflows/main.yml).

:::tip
For comparision screenshots you will need to have a main branch or base branch with the screenshots already uploaded to the Webshot Archive API. Webshot Archive stores images with their commit hash so if you want to compare screenshots from a PR to the main branch, you will need to have the screenshots from the main branch saved. Your first PR will not have any screenshots to compare to, thats ok. After you merge your first PR, the main branch screenshots will be uploaded to the Webshot Archive API (using the Github Action below) and you will be able to compare screenshots from future PRs to the main branch.
:::

## Cypress Configuration

:::tip
Skip to [step 6](#step-6---configure--run-the-github-actions) if you are using a different e2e testing tool or already have a cypress configuration.
:::

### Step 1 - Install Cypress

In your project directory, run the following command to install Cypress.

```bash
npm install cypress --save-dev
```

### Step 2 - Add Cypress Configuration

running `npx cypress open` will create a `cypress.config.ts` file in your project directory along with a lot of other files to get started.

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
cypress.io has [a great tutorial](https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test) on how to write tests and get started with Cypress.
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

After running the command, you should see the screenshots in the `dist/cypress` folder. This folder is used in the Github Action to upload the screenshots to the Webshot Archive API. You should add the `dist` folder to your `.gitignore` file so it is not committed to the repository.

### Step 6 - Configure & run the Github Actions

You should have at least two github actions workflows that upload the screenshots to the Webshot Archive API. One for pull requests and one for pushes to the `main` branch.
Every time you run the Github Action, it will upload the screenshots to the Webshot Archive API and associate the screenshot with the commit hash. When you raise a new PR, the Github Action will compare the screenshot found in the base branch.

```yaml title=".github/workflows/pr.yml" {36-44}
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
          clientId: ${{ secrets.CLIENT_ID }}
          clientSecret: ${{ secrets.CLIENT_SECRET }}
          projectId: ${{secrets.PROJECT_ID}}

      - name: Check if screenshots failed
        if: steps.screenshots.outcome == 'failure'
        run: exit 1
```

:::tip
The `continue-on-error: true` option is used to allow the Github Action to continue running even if the screenshots fail. This is useful if you want to run the Github Action, upload the screenshots to the Webshot Archive API and comment on the PR with the results then fail the PR if the screenshots fail.
:::

```yaml title=".github/workflows/main.yml" {38-46}
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
          clientId: ${{ secrets.CLIENT_ID }}
          clientSecret: ${{ secrets.CLIENT_SECRET }}
          projectId: ${{secrets.PROJECT_ID}}

      - name: Check if screenshots failed
        if: steps.screenshots.outcome == 'failure'
        run: exit 1
```

After the PR is merged, the above action should run and the main branch screenshots will be generated and uploaded to the Webshot Archive API.

#### Github Action Inputs

- `screenshotsFolder`: The folder where the screenshots are saved.
- `clientId`: The client id of the client you want to upload the screenshots to (refer to [Create Client Credentials](/docs/tutorial-basics/create-client-credentials)).
- `clientSecret`: The client secret of the client you want to upload the screenshots to (refer to [Create Client Credentials](/docs/tutorial-basics/create-client-credentials)).
- `projectId`: The id of the project you want to upload the screenshots to (Refer to the [projects dashboard](https://www.webshotarchive.com/projects)).

  ![Project ID](/img/screenshots/gha-project-id.png)

- `env.GITHUB_TOKEN`: The Github token for the Github Actions job. This is used to comment on the PR with the screenshot results. You may omit this if you set comments to false on the with options.

There are additional advanced options you can use to configure the Github Action. Refer to the [API Docs](/docs/api) for more information.

### Step 7 - Validate the Github PR

Once the action runs, you should see a comment with the new screenshots in the PR as shown below and on [this PR](https://github.com/toshimoto821/webshot-archive-docs/pull/1).

![Github PR Screenshots](/img/screenshots/gha-screenshot-new.png)

Once merged, the main branch screenshots will be uploaded to the Webshot Archive API and you will be able to see a comparison of the screenshots from the base or main branch and the PR on any new PRs raised (as shown below and in [this pr](https://github.com/toshimoto821/webshot-archive-docs/pull/2)).

![Github PR Screenshots](/img/screenshots/gha-screenshot-compare.png)
