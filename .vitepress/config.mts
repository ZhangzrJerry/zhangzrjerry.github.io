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
  base: '/',
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
          link: '/about/',
          items: [
            { text: 'Resume', link: '/about/personal/resume' },
            { text: 'Academic', link: '/about/personal/academic' }
          ]
        },
        {
          text: 'Projects',
          link: '/about/projects/projects',
          items: [
            { text: 'FRC Robots', link: '/about/projects/frc' },
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
        link: '/posts/'
      },
      {
        text: 'SLAM',
        collapsed: false,
        items: [
          { text: 'VINS Initialization', link: '/posts/2024/vins-init' },
          {
            text: 'IMU Preintegration', link: '/posts/2025/imu-preintegration'
          },
          { text: 'Spline Fusion', link: '/posts/2024/spline-fusion' },
          { text: 'SEIF SLAM', link: '/posts/2025/seif-slam' },
          { text: 'Gauge Handling', link: '/posts/2024/gauge-handling' },
        ]
      },
      {
        text: 'PnC',
        collapsed: false,
        items: [
          { text: 'Cyber Planner', link: '/posts/2025/cyber-planner' },
          { text: 'CoTiMo Planner', link: '/posts/2024/cotimo-planner' }
        ]
      },
      {
        text: 'Notes',
        collapsed: false,
        items: [
          { text: 'COMP 2711', link: '/posts/2024/comp-2711' },
          { text: 'ELEC 3200', link: '/posts/2024/elec-3200' },
          {
            text: 'ELEC 5650',
            collapsed: true,
            items: [
              { text: 'Math Tools', link: '/posts/2025/elec-5650/math-tools' },
              { text: 'Estimation', link: '/posts/2025/elec-5650/estimation' },
              { text: 'Kalman Filter', link: '/posts/2025/elec-5650/kalman-filter' },
              { text: 'LQR', link: '/posts/2025/elec-5650/lqr' }
            ],
            'link': '/posts/2025/elec-5650'
          }
        ]
      },
      {
        text: 'Uncategorized',
        collapsed: false,
        items: [
          {
            text: 'BIM Localization',
            link: '/posts/2025/bim-localization'
          },
          { text: 'Visual Feature', link: '/posts/2025/visual-feature' },
          { text: 'Rotation Representation', link: '/posts/2024/rotation-representation' },
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
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          displayMath: [['$$', '$$'], ['\\(', '\\)'], ['\\begin{equation}', '\\end{equation}']]
        }
      });
    },
    image: {
      lazyLoading: true
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