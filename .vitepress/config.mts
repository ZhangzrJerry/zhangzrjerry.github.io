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
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'About',
        items: [
          { text: 'Bio', link: '/about/' },
          { text: 'Resume', link: '/about/personal/resume' },
          { text: 'Projects', link: '/about/projects/projects' },
          { text: 'Publications', link: '/about/personal/academic#publications' },
          { text: 'Connections', link: '/about/social/friends' }
        ]
      },
      { text: 'Posts', link: '/posts' }
    ],
    search: {
      'provider': 'local',
    },

    sidebar: {
      '/about/': [
        {
          text: 'About',
          items: [
            { text: 'Bio', link: '/about/' },
            { text: 'Resume', link: '/about/personal/resume' },
            { text: 'Academic', link: '/about/personal/academic' }
          ]
        },
        {
          text: 'Projects',
          items: [
            { text: 'Projects', link: '/about/projects/projects' },
            { text: 'FRC', link: '/about/projects/frc' },
          ]
        },
        {
          text: 'Social',
          items: [
            { text: 'Connections', link: '/about/social/friends' }
          ]
        }
      ],
      '/posts/': [{
        text: 'Blogs',
        items: [
          { text: 'Index', link: '/posts/' },
          {
            text: '2025',
            items: [
              {
                text: 'ELEC 5650', items: [
                  { text: 'Math Tools', link: '/posts/2025/elec-5650/math-tools' },
                  { text: 'Estimation', link: '/posts/2025/elec-5650/estimation' },
                  { text: 'Kalman Filter', link: '/posts/2025/elec-5650/kalman-filter' },
                  { text: 'LQR', link: '/posts/2025/elec-5650/lqr' }
                ],
                'link': '/posts/2025/elec-5650'
              },
              { text: 'SEIF SLAM', link: '/posts/2025/seif-slam' },
              { text: 'Visual Feature', link: '/posts/2025/visual-feature' },
              { text: 'Cyber Planner', link: '/posts/2025/cyber-planner' },
            ]
          },
          {
            text: '2024',
            items: [
              { text: 'VINS Initialization', link: '/posts/2024/vins-init' },
              { text: 'CoTiMo Planner', link: '/posts/2024/cotimo-planner' },
              { text: 'Rotation Representation', link: '/posts/2024/rotation-representation' },
            ]
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