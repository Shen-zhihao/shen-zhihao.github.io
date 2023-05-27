// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'wenStudy', // The title of the website
  tagline: 'show me your code', // A word on the front page
  url: 'https://shen-zhihao.github.io/', // Your website URL
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // favicon: 'img/cat4.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'shen-zhihao', // Usually your GitHub org/user name.
  projectName: 'shen-zhihao.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,


  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'http://192.168.0.166/dwe/online-document/jx-online-document-web',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    // tab页目录
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: '前端学习',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'HtmlSidebar',
            position: 'left',
            label: 'HTML和CSS',
          },
          {
            type: 'docSidebar',
            sidebarId: 'JavaScriptSidebar',
            position: 'left',
            label: 'JavaScript',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ReactSidebar',
            position: 'left',
            label: 'React相关',
          },
          {
            type: 'docSidebar',
            sidebarId: 'NodeSidebar',
            position: 'left',
            label: 'NodeJs相关',
          },
          {
            type: 'docSidebar',
            sidebarId: 'WorkSidebar',
            position: 'left',
            label: '前端工程化相关',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ComponentsSidebar',
            position: 'left',
            label: '组件库相关',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} zhihao Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
