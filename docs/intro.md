---
sidebar_position: 1
---

# Welcome to Webshot Archive

**Capture, compare, and track visual changes in your web applications with automated screenshot testing.**

## What is Webshot Archive?

Webshot Archive is a powerful visual regression testing platform that helps you:

- **Automatically capture screenshots** of your website during CI/CD
- **Compare visual changes** between different versions of your app
- **Track visual history** over time with a beautiful UI
- **Integrate seamlessly** with GitHub Actions and pull requests
- **Catch visual bugs** before they reach production

### Key Features

✅ **Automated Screenshot Capture** - Works with Cypress, Playwright, and other testing frameworks  
✅ **Visual Diff Generation** - Uses pixelmatch for accurate visual comparisons  
✅ **GitHub Integration** - Automatic PR comments with visual diffs  
✅ **Historical Tracking** - View visual changes over time in a timeline  
✅ **Team Collaboration** - Share visual changes with your team  
✅ **API-First Design** - Integrate with any CI/CD system

## How It Works

1. **Setup** - Create a project and get your API credentials
2. **Capture** - Run your tests to generate screenshots
3. **Upload** - Use our GitHub Action to upload screenshots to Webshot Archive
4. **Compare** - Automatically compare against previous versions
5. **Review** - Get visual diffs in PR comments and track changes over time

### Example Workflow

When you create a pull request, Webshot Archive will:

1. Capture screenshots of your changes
2. Compare them against the base branch
3. Generate visual diffs for changed components
4. Post a comment with the results

![Github PR Screenshots](/img/screenshots/gha-screenshot-compare.png)

You can also view the complete visual history in the Webshot Archive dashboard:

![Webshot Archive UI](/img/screenshots/webshot-archive-ui.png)

## Quick Start

Ready to get started? Follow these steps:

1. **[Sign up](https://www.webshotarchive.com/account)** for a free account
2. **[Create a project](https://www.webshotarchive.com/projects)** to organize your screenshots
3. **[Set up authentication](./tutorial-basics/create-client-credentials)** for GitHub Actions
4. **[Configure your workflow](./recipes/push-pr-action)** to capture and upload screenshots

:::tip Free Tier Available
Start with our freemium plan - perfect for testing and small projects. Upgrade when you need more features or higher limits.
:::

## What You'll Learn

This documentation will guide you through:

- **Authentication Setup** - Creating secure API credentials
- **GitHub Actions Integration** - Automating screenshot capture and upload
- **Screenshot Configuration** - Setting up Cypress, Playwright, or other tools
- **Visual Comparison** - Understanding diff results and thresholds
- **Dashboard Usage** - Navigating the Webshot Archive UI
- **Advanced Features** - Custom workflows and API integration

## Prerequisites

Before you begin, make sure you have:

- A **GitHub account** for repository access
- A **web application** to test (React, Vue, Angular, etc.)
- Basic knowledge of **CI/CD concepts**
- Familiarity with **testing frameworks** (Cypress, Playwright, etc.)

## Support & Community

- **Documentation** - This site contains everything you need
- **GitHub Issues** - [Report](https://github.com/webshotarchive/docs) bugs or request features
- **Discord** - Join [our community](https://discord.gg/a9qkpVxPnF) for help and discussions

---
