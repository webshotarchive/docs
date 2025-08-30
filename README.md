# Webshot Archive Documentation

This is the documentation site for [Webshot Archive](https://www.webshotarchive.com), a visual regression testing platform that helps you capture, compare, and track visual changes in your web applications.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the site
pnpm build

# Preview the build
pnpm serve
```

## 📚 Documentation Structure

```
docs/
├── intro.md                           # Welcome and overview
├── quick-start.md                     # Step-by-step getting started
├── tutorial-basics/                   # Core tutorials
│   ├── create-client-credentials.mdx  # Authentication setup
│   └── setting-up-screenshots-with-cypress.mdx  # Cypress integration
├── recipes/                           # Practical examples
│   └── push-pr-action.md              # GitHub Actions workflow
├── tutorial-webshotarchive-ui/        # Dashboard guide
│   ├── account.md                     # Account management
│   ├── project.md                     # Project overview
│   └── project-settings.md            # Project configuration
├── api.md                             # API reference
└── troubleshooting.md                 # Common issues and solutions
```

## 🛠 Development

### Adding New Documentation

1. **Create new files** in the appropriate directory
2. **Update sidebar** in `sidebars.ts` to include new pages
3. **Add frontmatter** with proper metadata:

```markdown
---
sidebar_position: 1
title: Your Page Title
---

# Your Page Title

Content goes here...
```

### Styling Guidelines

- Use **bold** for important concepts
- Use `code` for technical terms and commands
- Use ```yaml for configuration examples
- Use ```javascript for code examples
- Use callouts for tips, warnings, and notes:

```markdown
:::tip Pro Tip
This is a helpful tip!
:::

:::warning Important
This is a warning!
:::

:::info Note
This is an informational note.
:::
```

### Images and Assets

- Store images in `static/img/`
- Use relative paths: `/img/your-image.png`
- Optimize images for web (compress PNGs, use WebP when possible)

## 🚀 Deployment

### GitHub Pages

```bash
# Deploy to GitHub Pages
pnpm deploy
```

### Other Platforms

The built site is in the `build/` directory and can be deployed to any static hosting service:

- Netlify
- Vercel
- AWS S3
- Cloudflare Pages

## 📝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** locally with `pnpm start`
5. **Submit** a pull request

### Documentation Standards

- **Clear and concise** - Write for developers who are new to the platform
- **Step-by-step** - Break complex processes into numbered steps
- **Examples** - Include practical code examples
- **Troubleshooting** - Anticipate common issues and provide solutions
- **Consistent** - Follow established patterns and naming conventions

## 🔧 Configuration

### Docusaurus Config

Main configuration is in `docusaurus.config.ts`:

- Site metadata
- Navigation
- Theme customization
- Plugin configuration

### Sidebar Configuration

Edit `sidebars.ts` to organize documentation structure:

```typescript
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'quick-start',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'tutorial-basics/create-client-credentials',
        // ... more items
      ],
    },
  ],
};
```

## 📊 Analytics

The site uses Google Analytics (if configured) to track usage and improve documentation.

## 🤝 Support

- **Documentation Issues**: Open an issue in this repository
- **Community**: Join our [Discord community](https://discord.gg/qx5fkzBV)

## 📄 License

This documentation is licensed under the same terms as the main Webshot Archive project.
