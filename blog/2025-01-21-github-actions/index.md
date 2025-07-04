---
slug: github-actions
title: Github Actions
authors: [toshimoto821]
tags: [developer, github-actions]
---

# Github Actions

Github Actions run on a [Github Event](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows), however, the default
behavior of the Webshot Archive Github Action will differ based on the type of event being run.

When running a workflow on `pull_request`, the Webshot Archive Github Action will default its **compareCommitSha** (the commit to compare against) based on `${{ github.event.pull_request.base.sha }}`.
For a workflow that runs on `push`, the **compareCommitSha** is based on `${{ github.event.before }}`. Override this behavior by setting the **compareCommitSha** in the action input options.
See the [API](/docs/api) docs for more information of customizing the action input options.

:::note
To comment on a pull request with the captured images, the workflow must run on `pull_request`.

:::

<!-- truncate -->

Below is an example of the Github Action workflow that runs on both `pull_request` and `push`.
The purpose is to capture the pull request images and comment on the PR as well as
capture the main branch images after the pr is merged. Running the action on push to `main` will also
gaurantee that the main branch always has the latest UI snapshot.

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
        uses: webshotarchive/github-action@v1.1.0
        with:
          screenshotsFolder: .next/cypress
          clientId: ${{ vars.WEBSHOT_CLIENT_ID }}
          clientSecret: ${{ secrets.WEBSHOT_CLIENT_SECRET }}
          projectId: ${{vars.WEBSHOT_PROJECT_ID}}
```
