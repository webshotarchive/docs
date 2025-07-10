---
sidebar_position: 4
title: API Reference
---

# API Reference

Complete reference for the Webshot Archive API and GitHub Action.

## GitHub Action

The Webshot Archive GitHub Action is the primary way to upload screenshots and generate visual comparisons in your CI/CD pipeline.

:::tip Prerequisites
Before using the GitHub Action, make sure you have:

- [Created client credentials](./tutorial-basics/create-client-credentials)
- [Set up your project](./tutorial-webshotarchive-ui/project)
- [Added secrets to your repository](./tutorial-basics/create-client-credentials#step-6-add-credentials-to-github-repository-secrets)
  :::

### Basic Usage

```yaml
- name: Upload Screenshots
  uses: webshotarchive/github-action@v1.1.1
  with:
    screenshotsFolder: cypress/screenshots
    clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
    clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
    projectId: ${{ secrets.WEBSHOT_ARCHIVE_PROJECT_ID }}
```

### Action Parameters

| Parameter           | Type    | Required | Default                                                                              | Description                                     |
| ------------------- | ------- | -------- | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| `screenshotsFolder` | string  | Yes      | -                                                                                    | Path to folder containing screenshots to upload |
| `clientId`          | string  | Yes      | -                                                                                    | Your Webshot Archive client ID                  |
| `clientSecret`      | string  | Yes      | -                                                                                    | Your Webshot Archive client secret              |
| `projectId`         | string  | Yes      | -                                                                                    | Your Webshot Archive project ID                 |
| `failedTestPattern` | string  | No       | `"failed"`                                                                           | Regex pattern to match failed test screenshots  |
| `commitSha`         | string  | No       | `${{github.event.pull_request.head.sha}}` (PR)<br/>`${{github.event.after}}` (Push)  | Commit SHA for the current screenshots          |
| `compareCommitSha`  | string  | No       | `${{github.event.pull_request.base.sha}}` (PR)<br/>`${{github.event.before}}` (Push) | Commit SHA to compare against                   |
| `branchName`        | string  | No       | `${{github.head_ref}}` (PR)<br/>`${GITHUB_REF##*/}` (Push)                           | Branch name for the screenshots                 |
| `mergedBranch`      | string  | No       | -                                                                                    | Branch that was merged (for merge events)       |
| `comment`           | boolean | No       | `true` (PR)<br/>`false` (Push)                                                       | Whether to comment on the PR                    |
| `tags`              | string  | No       | Auto-generated                                                                       | Tags to add to screenshots                      |
| `compareBranch`     | string  | No       | -                                                                                    | **Deprecated**: Use `compareCommitSha` instead  |

### Parameter Details

#### Required Parameters

**`screenshotsFolder`** - Path to the folder containing your screenshots

- **Cypress**: `cypress/screenshots/`
- **Playwright**: `test-results/` or custom path
- **Selenium**: `screenshots/`

**`clientId` & `clientSecret`** - Your API credentials

- Get these from your [account settings](https://www.webshotarchive.com/account/team)
- Store as GitHub secrets for security

**`projectId`** - Your Webshot Archive project ID

- Found in your project dashboard
- Each project has a unique ID

#### Optional Parameters

**`failedTestPattern`** - Regex to identify failed test screenshots

- Default: `"failed"`
- Examples: `"error"`, `"failure"`, `"(failed)"`

**`commitSha` & `compareCommitSha`** - Git commit references

- Automatically set based on GitHub event context
- Override for custom comparison logic

**`comment`** - Whether to post PR comments

- `true` for pull requests (default)
- `false` for push events (default)

**`tags`** - Custom tags for screenshots

- Auto-generated based on filename patterns
- Manual tags: `"mobile,desktop,homepage"`

### Tag Generation Logic

The action automatically generates tags based on:

1. **Failed tests**: Files ending in `(failed).png` get `failed` tag
2. **Custom tags**: Files with `tags-[tag1,tag2,tag3]` in filename get those tags
3. **Manual tags**: Tags specified in the `tags` parameter

#### Basic Configuration

```yaml
- name: Upload Screenshots
  uses: webshotarchive/github-action@v1.1.1
  with:
    screenshotsFolder: cypress/screenshots
    clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
    clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
    projectId: ${{ secrets.WEBSHOT_ARCHIVE_PROJECT_ID }}
```

#### Advanced Configuration

```yaml
- name: Upload with Custom Settings
  uses: webshotarchive/github-action@v1.1.1
  with:
    screenshotsFolder: test-results
    clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
    clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
    projectId: ${{ secrets.WEBSHOT_ARCHIVE_PROJECT_ID }}
    failedTestPattern: 'error'
    tags: 'mobile,desktop,ci'
    comment: true
```

#### Environment-Specific Configuration

```yaml
- name: Upload Staging Screenshots
  uses: webshotarchive/github-action@v1.1.1
  with:
    screenshotsFolder: cypress/screenshots
    clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
    clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
    projectId: ${{ secrets.WEBSHOT_ARCHIVE_PROJECT_ID }}
    tags: 'staging,automated'
    comment: false # Don't comment on staging builds
```

### Error Handling

The action provides detailed error information when things go wrong:

#### Common Error Responses

**Authentication Error:**

```json
{
  "error": "Invalid client credentials"
}
```

**Project Not Found:**

```json
{
  "error": "Project not found or access denied"
}
```

**Screenshots Not Found:**

```json
{
  "error": "No screenshots found in specified folder"
}
```

#### Debug Mode

Enable debug logging for troubleshooting:

```yaml
- name: Upload with Debug
  uses: webshotarchive/github-action@v1.1.1
  env:
    ACTIONS_STEP_DEBUG: true # Enable detailed logging
  with:
    screenshotsFolder: cypress/screenshots
    clientId: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_ID }}
    clientSecret: ${{ secrets.WEBSHOT_ARCHIVE_CLIENT_SECRET }}
    projectId: ${{ secrets.WEBSHOT_ARCHIVE_PROJECT_ID }}
```

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
