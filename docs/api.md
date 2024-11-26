---
sidebar_position: 1
---

## Github Actions

### Uplaod Images

Upload images to the Webshot Archive using `toshimoto821/toshi-action` available at [github.com/toshimoto821/toshi-action](https://github.com/toshimoto821/toshi-action) or the Github marketplace.
.

#### Parameters

| Parameter         | Type    | Required | Description                                     |
| ----------------- | ------- | -------- | ----------------------------------------------- |
| screenshotsFolder | string  | Yes      | The folder containing the screenshots to upload |
| commitSha         | string  | Yes      | The commit SHA                                  |
| compareCommitSha  | string  | No       | The commit SHA of the branch                    |
| compareBranch     | string  | No       | The branch to compare against                   |
| branchName        | string  | No       | The branch to upload to                         |
| mergedBranch      | string  | No       | The branch that was merged                      |
| comment           | boolean | No       | Whether to comment on the PR                    |
| type              | string  | No       | Push or merge                                   |
| tags              | string  | No       | Tags to add to the screenshots                  |
| clientId          | string  | Yes      | Your client ID                                  |
| clientSecret      | string  | Yes      | Your client secret                              |

#### Example Implementation

```yaml
- name: WebshotArchive Action
  uses: toshimoto821/toshi-action@images
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    screenshotsFolder: dist/cypress
    commitSha: ${{ github.event.pull_request.head.sha }}
    compareCommitSha: ${{ github.event.pull_request.base.sha }} #the sha the pr is going into
    compareBranch: ${{ github.event.pull_request.base.ref }}
    branchName: ${{ github.event.pull_request.head.ref }}
    mergedBranch: ${{ github.event.pull_request.base.ref }}
    type: "push"
    comment: true
    tags: pr
    projectId: ${{secrets.WEBSHOT_ARCHIVE_PROJECT_ID}}
    clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
    clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
```

## Error Handling

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
    "type": "merge",
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
