import { defineConfig } from 'vitepress';
import { useSidebar } from 'vitepress-openapi'
import spec from '../public/openapi.json' with { type: 'json' }
import { pagefindPlugin } from 'vitepress-plugin-pagefind';

const sidebar = useSidebar({
  spec,
  // Optionally, you can specify a link prefix for all generated sidebar items.
  linkPrefix: '/operations/',
})

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'AeroDB ',
  titleTemplate: ':title - AeroDB API Documentation',
  description: 'Explore the AeroDB API with ease',
  lastUpdated: true,
  head: [
      ['link', { rel: 'icon', href: '/icon.svg' }],
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
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9H8S0LMT88');
        `
      ]
    ],
  themeConfig: {
    aside: "left",
    logo: {
      src: '/icon.svg',
      alt: 'AeroDB Logo',
    },
    
    nav: [ 
      { text: 'Airports', link: '/operations/Airports_list.html' },
      { text: 'Notams', link: '/operations/Notams_list.html' },
      { text: 'Pricing', link: '/pricing' },
    ],
    search: {
      provider: 'local',
      // options: {
      //   appId: 'Q1X6Z2V9Y3',
      //   apiKey: 'e03fa1b013cf7b5dd60158e9fbc85721',
      //   indexName: 'Main website',
      // }
    },
    sidebar: [
      // {
      //   text: "Browse",
      //   items: [
      //     {
      //       text: 'Airports',
      //       link: '/airports'
      //     },
      //     {
      //       text: 'Notam',
      //       link: '/notams'
      //     },
      //     {
      //       text: 'Airlines',
      //       link: '/airlines'
      //     },
      //   ]
      // },
      {
        text: 'API References',
        items: [
          {
            text: 'Introduction',
            link: '/introduction',
          },
          ...sidebar.generateSidebarGroups({
      linkPrefix: "/operations/",
      sidebarItemTemplate: ({
        method,
        path,
        title
      }) => {
        const operation = spec.paths[path]?.[method];
        const displayText = title || (operation ? operation.summary : path);
        return `<div class="OASidebarItem group/oaOperationLink" style="display: grid; grid-template-columns: 1fr auto;">
        <span class="text" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${displayText}</span>
        <span class="OASidebarItem-badge OAMethodBadge--${method.toLowerCase()}">${method.toUpperCase()}</span>
      </div>`;
      }
    }),
        ],
      }
    ],
  },
  vite: {
    plugins: [pagefindPlugin()],
  }
});
