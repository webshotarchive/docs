---
sidebar_position: 2
title: Add Github Action Step
---

# Setting up the Github Actions

:::tip
If you have not created your client credentials yet, you can do so by following the [create client credentials](/docs/tutorial-basics/create-client-credentials) tutorial.

:::

Webshot Archive integrates with Github Actions to upload screenshots to the Webshot Archive API. You need to add a step to your Github Actions workflow to upload the screenshots. The code for the Github Action is publicaly available on [Github](https://github.com/toshimoto821/webshotarchive).

## Update your Github Actions Workflow

```yaml title="github-action-step.yml" {7-15}
# ... other steps ...
- name: Screenshots
  run: npx nx run webshotarchive-e2e:e2e:production
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
# ... other steps ...
```

:::tip Required Environment Variables

- `env.GITHUB_TOKEN`: The Github token for the Github Actions job. This is used to comment on the PR with the screenshot results. You may omit this if you set comments to false on the with options.
  :::

:::tip Required with options

- `with.screenshotsFolder`: The folder where the screenshots are stored.
- `with.clientId`: The client ID for the Webshot Archive API.
- `with.clientSecret`: The client secret for the Webshot Archive API.
- `with.projectId`: The project ID for the screenshot upload.

There are other options available that can be found on the [api docs](/docs/api).
:::

### The Project ID

:::tip clientId and clientSecret
The clientId and clientSecret are used to authenticate the Webshot Archive API. You can find the clientId and clientSecret in the [client credentials](/docs/tutorial-basics/create-client-credentials) tutorial.
:::

The project ID is the ID of the project you want to upload the screenshots to. You can find the project ID on the projects page of the Webshot Archive dashboard.
![project-id](/img/screenshots/gha-project-id.png)

## Running the Github Action

The most common way to run the github action is when a pull request is raised or when a pull request is merged. If you run the github action on a pull request it will comment on the pull request with the screenshot comparison/diff. You may disable the commenting by setting the `with.comments` option to false.
