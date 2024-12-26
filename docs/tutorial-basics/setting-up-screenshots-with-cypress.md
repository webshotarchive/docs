---
sidebar_position: 3
---

# Setting up Screenshots with Cypress

After [setting up your API User](/docs/tutorial-basics/create-client-credentials) and [updating your Github Actions workflow](/docs/tutorial-basics/add-github-action-step), you can run cypress, playwright, or other e2e testing tool the Github Action for a Pull Request. The action will upload the screenshots to the Webshot Archive API and comment on the Pull Request with the results.

## Cypress Configuration

:::tip
Skip this step if you are using a different e2e testing tool or already have a cypress configuration.
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

### Step 6 - Run the Github Action

```yaml title=".github/workflows/pr.yml"
# ... other steps ...
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
# ... other steps ...
```

:::tip
The `continue-on-error: true` option is used to allow the Github Action to continue running even if the screenshots fail. This is useful if you want to run the Github Action, upload the screenshots to the Webshot Archive API and comment on the PR with the results.
:::
