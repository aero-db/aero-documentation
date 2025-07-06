import { defineConfig } from 'vitepress';
import { useSidebar } from 'vitepress-openapi'
import spec from '../public/openapi.json' with { type: 'json' }

const sidebar = useSidebar({
  spec,
  // Optionally, you can specify a link prefix for all generated sidebar items.
  linkPrefix: '/operations/',
})

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'AeroDB ',
  description: 'Explore the AeroDB API with ease',
  head: [
      [
        'script',
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-9H8S0LMT88'
        }
      ],
      [
        'script',
        {},
        `
        window.dataLayer = window.dataLayer || [];
        ...

        gtag('config', 'G-9H8S0LMT88');
        `
      ]
    ],
  themeConfig: {
    nav: [{ text: 'API Reference', link: '/introduction' }],

    sidebar: [
      {
        text: '',
        items: [
          {
            text: 'Introduction',
            link: '/introduction',
          },
          ...sidebar.itemsByTags(),
        ],
      }
    ],
  },
});
