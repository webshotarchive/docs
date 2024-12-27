---
sidebar_position: 1
title: Github Action Credentials
---

:::info
At the end of this tutorial, you will have a working setup for capturing screenshots with Cypress and uploading them to the Webshot Archive API and showing image diffs on a Github PR.
![Screenshot of the Github Action](/img/screenshots/gha-screenshot-compare.png)
:::

# Github Action Credentials

This section of the tutorial will guide you through creating a Client ID and Client Secret for the Webshot Archive API.

Credentials to use for Github Actions to upload images and interact with the Webshot Archive API can be created on the [account page](https://www.webshotarchive.com/account) of [webshotarchive.com](https://www.webshotarchive.com).

:::info
You will need to create an account on [webshotarchive.com](https://www.webshotarchive.com) to create credentials. Creating an account is free, however you will not be able to upload images or create a service account user without a paid subscription (plans start at $5/month).
:::

## Add User (Service Account User)

### Step 1

Click the `Add User` button on the [account page](https://www.webshotarchive.com/account) as shown in the bottom right below.
![Add User](/img/screenshots/account-add-user-1.png)

### Step 2

Next switch to the `Add Service Account User (Github Actions)` tab. Click the `Add User` button.
![Add User](/img/screenshots/account-add-user-2.png)

### Step 3

Click the `View / Add Credentials` button on the newly created service account user.
![Add User](/img/screenshots/account-add-user-3.png)

### Step 4

Click `Create Credentials` button.
![Add User](/img/screenshots/account-add-user-4.png)

### Step 5

Save the client secret somewhere safe. Once you close this dialog, you will not be able to access it again.

![Add User](/img/screenshots/account-add-user-5.png)

:::caution Client Credentials
Your client secret can not be retrieved once you close this dialog. You can always create a new Client ID and Client Secret combination if you lose your secret.
:::

## Add Client ID / Secret to Github

### Step 6

Save the Client ID and Client Secret to your Github repository secrets.

![Add User](/img/screenshots/account-add-user-6.png)
