---
sidebar_position: 4
title: API
---

## Github Actions

:::tip Before you continue
Make sure you [create client credentials](/docs/tutorial-basics/create-client-credentials) for your project and save to github secrets.
:::

### Upload Images

Upload images to the Webshot Archive using `webshotarchive/github-action` available at [https://github.com/webshotarchive/github-action](https://github.com/webshotarchive/github-action) and on the [Github Marketplace](https://github.com/webshotarchive/github-action)

#### Parameters

| Parameter                  | Type    | Required | Default (Pull Request)                      | Default (Push)               | Description                                      |
| -------------------------- | ------- | -------- | ------------------------------------------- | ---------------------------- | ------------------------------------------------ |
| screenshotsFolder          | string  | Yes      | -                                           | -                            | The folder containing the screenshots to upload. |
| clientId                   | string  | Yes      | -                                           | -                            | Your client ID.                                  |
| clientSecret               | string  | Yes      | -                                           | -                            | Your client secret.                              |
| projectId                  | string  | Yes      | -                                           | -                            | The Webshot Archive projectId.                   |
| failedTestPattern          | string  | no       | "failed"                                    | "failed"                     | A regular expression to match failed tests.      |
| commitSha                  | string  | No       | `${{github.event.pull_request.head.sha }}`  | `${{ github.event.after }}`  | The commit SHA represented in the screenshot     |
| compareCommitSha           | string  | No       | `${{ github.event.pull_request.base.sha }}` | `${{ github.event.before }}` | The commit SHA to compare with.                  |
| branchName                 | string  | No       | `${{ github.head_ref }}`                    | `${GITHUB_REF##*/}`          | The branch associated with the screenshot.       |
| mergedBranch               | string  | No       | -                                           | \* see below                 | The branch that was merged.                      |
| comment                    | boolean | No       | true                                        | false                        | Whether to comment on the PR.                    |
| tags                       | string  | No       | \* see below                                | \* see below                 | Tags to add to the screenshots.                  |
| compareBranch (deprecated) | string  | No       | -                                           | -                            | The branch to compare against.                   |

##### Notes

- `failedTestPattern`: The `failedTestPattern` is used to match filenames of the failed tests in the screenshot. Different test runners will name the files differently.
- `tags`: The tags logic is handled by the Webshot Archive API [here](https://github.com/webshotarchive/github-action/blob/main/src/main.js#L194-L200). Key points:
  - images ending in (failed).png get `failed` tag.
  - images with title tags-[tag1, tag2, tag3] get the tags `tag1`, `tag2`, `tag3`.

#### Example Implementation

```yaml
- name: WebshotArchive Action
  uses: toshimoto821/toshi-action@v0.0.3
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    screenshotsFolder: dist/cypress
    projectId: ${{secrets.WEBSHOT_ARCHIVE_PROJECT_ID}}
    clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
    clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
```

#### Error Handling

Errors will be returned as a string in the `error` field of the response.

For greater debugging information, you can enable debug logs by setting the `ACTIONS_STEP_DEBUG` environment variable to `true`. This will output the details of the response, including the `error` and `metadata` fields.

```json
{
  "data": {
    "originalName": "web-ui-e2e -- Hero.png",
    "path": "dist/cypress/apps/web-ui-e2e/screenshots/app.cy.ts/web-ui-e2e -- Hero.png",
    "userId": "6739e6d10d48b487ba80222b",
    "project": "***",
    "isDuplicate": false,
    "isDeleted": false,
    "bucketPath": "6739e6d10d48b487ba80222b/f1db95ff8605a53fd28ae011f8cbe8ad876dc5e8/1065e815-341c-4d51-806b-0524b73dd354.png",
    "commitSha": "f1db95ff8605a53fd28ae011f8cbe8ad876dc5e8",
    "mimeType": "image/png",
    "bucket": "timechain-actions",
    "uniqueId": "1065e815-341c-4d51-806b-0524b73dd354",
    "size": 637329,
    "branchName": "main",
    "mergedBranch": "main",
    "eventName": "merge",
    "tags": ["release"],
    "metaVersion": 1,
    "createdAt": "2024-11-26T01:00:09.191Z",
    "updatedAt": "2024-11-26T01:00:09.191Z",
    "id": "67451d99fc442a32bd6e69dd"
  },
  "metadata": {
    "compareCommitSha": "9885f81d2c1b104c41970b8e018045390e16b306",
    "compareImage": "3b6efc32-51f4-46b9-9685-67a728f570b6",
    "metadata": true
  },
  "error": "Error: Image sizes do not match."
}
```

## API Endpoints

### Update Images

Provides a way to update image metadata. Useful for adding/updating tags.

URL: `/api/image/update/${projectId}/update-images`

#### Request

body:

```javascript
const headers = {
  'x-client-id': '<client-id>',
  'x-client-secret': '<client-secret>',
};
const body = {
  find: {
    commitSha: 'f1db95ff8605a53fd28ae011f8cbe8ad876dc5e8',
  },
  update: {
    tags: ['release', 'production'],
    // "path": "new/path/to/image.png",
    // "originalName": "renamed-image.png",
    // "commitSha": "updated-sha-value",
    // "branchName": "feature/new-branch",
    // "mergedBranch": "main",
    // "eventName": "merge"
  },
};
await axios.post(
  `https://api.webshotarchive.com/api/image/update/${projectId}/update-images`,
  body,
  {
    headers,
  }
);
```

#### Path Parameters

| Parameter | Type   | Required | Description    |
| --------- | ------ | -------- | -------------- |
| projectId | string | Yes      | The project ID |

#### Body Parameters

| Parameter           | Type     | Required | Description                   |
| ------------------- | -------- | -------- | ----------------------------- |
| find                | object   | Yes      | The object to find            |
| find.commitSha      | string   | No       | The sha to match on           |
| find.branchName     | string   | No       | The branch name to match on   |
| find.eventName      | string   | No       | The event name to match on    |
| find.path           | string   | No       | The path to match on          |
| find.originalName   | string   | No       | The original name to match on |
| find.tags           | string[] | No       | The tags to match on          |
| update              | object   | Yes      | The object to update          |
| update.tags         | string[] | Yes      | The tags to set               |
| update.path         | string   | No       | The path to set               |
| update.originalName | string   | No       | The original name to set      |
| update.commitSha    | string   | No       | The commit sha to set         |
| update.branchName   | string   | No       | The branch name to set        |
| update.mergedBranch | string   | No       | The merged branch to set      |
| update.eventName    | string   | No       | The event name to set         |
