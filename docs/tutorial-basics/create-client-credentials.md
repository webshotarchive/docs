---
sidebar_position: 1
title: Github Action Credentials
---

:::info
At the end of this tutorial, you will have a working setup for capturing screenshots with Cypress and uploading them to the Webshot Archive API and showing image diffs on a Github PR.
![Screenshot of the Github Action](/img/screenshots/gha-screenshot-compare.png)
:::

# Github Action Credentials

This section of the tutorial will guide you through creating a Client ID and Client Secret for the Webshot Archive API to use in Github Actions.

Next, you will use the [account page](https://www.webshotarchive.com/account) to create credentials for Github Actions to upload images and interact with the Webshot Archive API.

:::info
You will need to create an account on [webshotarchive.com](https://www.webshotarchive.com) to visit the account page. Creating an account is free, however you will not be able to upload images or create a service account user without a paid subscription (plans start at $5/month and there is a 14 day free trial - cancel anytime).
:::

Once you have created an account and signed up for a paid plan, you can create a service account user.

### Step 1 - Create a Service Account

Click the `Add User` button on the [account page](https://www.webshotarchive.com/account) as shown in the bottom right below.

:::info
When you create a new account for the first time, a service account user will be created for you and you can skip step 1 and 2.
:::

![Add User](/img/screenshots/account-add-user-1.png)

### Step 2 - Create a Service Account (cont.)

Next switch to the `Add Service Account User (Github Actions)` tab. Click the `Add User` button.

![Add User](/img/screenshots/account-add-user-2.png)

### Step 3 - Service Account Credentials

Click the `View / Add Credentials` button on the newly created service account user.

![Add User](/img/screenshots/account-add-user-3.png)

### Step 4 - Service Account Credentials (cont.)

Click `Create Credentials` button.

![Add User](/img/screenshots/account-add-user-4.png)

### Step 5 - Save Client Secret

Save the client secret somewhere safe. Once you close this dialog, you will not be able to access it again.

![Add User](/img/screenshots/account-add-user-5.png)

:::caution Client Credentials
Your client secret can not be retrieved once you close this dialog. You can always create a new Client ID and Client Secret combination if you lose your secret.
:::

### Step 6 - Add to Github

Save the Client ID and Client Secret to your Github repository secrets.

![Add User](/img/screenshots/account-add-user-6.png)
