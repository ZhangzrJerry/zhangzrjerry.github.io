import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import mathjax3 from 'markdown-it-mathjax3'

const customElementsForMathjax = [
  'mjx-container',
  'mjx-assistive-mml',
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'msgroup',
  'mstack',
  'msline',
  'mspace',
  'msqrt',
  'msrow',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'annotation',
  'annotation-xml',
  'mprescripts',
  'none'
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZhangzrJerry",
  description: "My Personal Website",
  head: [['link', { rel: 'icon', href: '/img/favicon.ico' }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/me/about' },
      { text: 'Blogs', link: '/me/blogs' }
    ],
    search: {
      'provider': 'local',
    },

    sidebar: {
      '/me/': [
        {
          text: 'About',
          items: [
            { text: 'Bio', link: '/me/about/' },
            { text: 'Resume', link: '/me/about/resume' },
            { text: 'Projects', link: '/me/about/projects' },
            {
              text: 'In FRC', link: '/me/about/frc'
            },
            {
              text: 'In HKUST', link: '/me/about/hkust'
            },
            { text: 'Friendly Links', link: '/me/about/friends' }
          ]
        }, {
          text: 'Blogs',
          items: [
            { text: 'Index', link: '/me/blogs/' },
            {
              text: 'Perception',
              items: [
                // { text: 'Feature Descriptors', link: '/me/blogs/perception/feature-descriptors' },
              ],
              collapsed: true
            },
            {
              text: 'PnC',
              items: [
                // { text: 'Classic Control', link: '/me/blogs/pnc/elec-3200' },
                { text: 'CoTiMo Planner', link: '/me/blogs/pnc/cotimo-planner' },
                { text: 'Cyber Planner', link: '/me/blogs/pnc/cyber-planner' },
              ],
              collapsed: true
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangzrjerry' },
      { icon: 'orcid', link: 'https://orcid.org/0009-0008-4156-1652' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/zirui-zhang-924958319/' }
    ]
  },

  vite: {
    plugins: [
      UnoCSS(),
    ],
  },

  markdown: {
    config: (md) => {
      md.use(mathjax3, {
        tex: {
          inlineMath: [['$', '$']],
          displayMath: [['$$', '$$']]
        }
      });
    }
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => customElementsForMathjax.includes(tag),
      },
    },
  },

  ignoreDeadLinks: true
})