import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'quick-start',
    {
      type: 'category',
      label: 'In Depth Guide',
      items: [
        'tutorial-basics/create-client-credentials',
        'tutorial-basics/setting-up-screenshots-with-cypress',
      ],
    },
    {
      type: 'category',
      label: 'Recipes',
      items: ['recipes/push-pr-action'],
    },
    {
      type: 'category',
      label: 'UI Guide',
      items: [
        'tutorial-webshotarchive-ui/account',
        'tutorial-webshotarchive-ui/project',
        'tutorial-webshotarchive-ui/project-settings',
      ],
    },
    'api',
    'troubleshooting',
  ],
};

export default sidebars;
