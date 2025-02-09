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
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
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
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml',
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
            {
              text: 'Projects', items: [
                { text: 'Projects', link: '/me/about/projects/projects' },
                { text: 'FRC Projects', link: '/me/about/projects/frc' }
              ]
            }, { text: 'Friendly Links', link: '/me/about/friends' }
          ]
        }, {
          text: 'Blogs',
          items: [
            { text: 'Index', link: '/me/blogs/' },
            {
              text: 'PnC',
              items: [
                { text: 'Cyber Planner', link: '/me/blogs/pnc/cyber-planner' },
              ],
              collapsed: true
            }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'orcid', link: 'https://orcid.org/0000-0000-0000-0000' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/you' }
    ]
  },

  vite: {
    plugins: [
      UnoCSS(),
    ],
  },

  markdown: {
    config: (md) => {
      md.use(mathjax3);
    }
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => customElementsForMathjax.includes(tag),
      },
    },
  }
})
