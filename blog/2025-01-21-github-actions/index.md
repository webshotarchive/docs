---
slug: github-actions
title: Github Actions
authors: [toshimoto821]
tags: [developer, github-actions]
---

# Github Actions

There are certain Github Action configurations that are required to run the Webshot Archive UI tests and comment on PR's. The primary takeaways are:

- the workflow runs on pull_request
- the workflow runs on push (for main branch)
- the action has the correct permissions

<!-- truncate -->

Below is an example of the Github Action configuration for the Webshot Archive UI tests.

```yaml title="create-webshot-archive-ui-action.yml" showLineNumbers
name: Cypress Tests

on:
  push:
    # run the action on the main branch to keep a snapshot of the UI on main
    branches:
      - main
  # run the action on PR, this way it will have the base commit to compare against
  # this allows an image diff to be created against the base commit
  pull_request:

permissions:
  actions: read # to run the action
  contents: read # to checkout the code
  issues: write # for comment on PR
  pull-requests: write # for comment on PR

jobs:
  cypress-run:
    runs-on: ubuntu-24.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9
          run_install: true

      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'

      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          build: pnpm run build
          start: pnpm run start
        env:
          # TODO: Would be nice to get vercel preview urls working here
          CYPRESS_BASE_URL: 'http://localhost:3000'
          NEXT_TELEMETRY_DISABLED: 1

      - name: WebshotArchive Action
        uses: toshimoto821/webshotarchive@v0.0.3
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          screenshotsFolder: .next/cypress
          clientId: ${{ vars.WEBSHOT_CLIENT_ID }}
          clientSecret: ${{ secrets.WEBSHOT_CLIENT_SECRET }}
          projectId: ${{vars.WEBSHOT_PROJECT_ID}}
```

To comment on a pull request, the action needs to run on pull_request, not on push. This is because the action needs to have the base commit to compare against.
Additionally, when the pull request is merged into main, the action runs on push to push the main branch image to the Webshot Archive. This way the main branch
always has the latest UI snapshot.
