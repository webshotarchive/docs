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

    'api',
    'troubleshooting',
  ],
};

export default sidebars;
