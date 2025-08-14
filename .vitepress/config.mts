import { defineConfig } from 'vitepress'
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
  srcDir: 'src',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about.html' },
      {
        text: 'Projects',
        items: [
          { text: '# FRC Alumnus #', link: '/projects/frc.html' },
          { text: 'Chronos Chain', link: '/projects/2025-cc.html' },
          { text: 'CoTiMo Planner', link: '/posts/2024/cotimo-planner.html' },
        ]
      },
      { text: 'Posts', link: '/posts/' }
    ],
    search: {
      'provider': 'local',
    },

    sidebar: {
      '/posts/': [{
        text: 'Posts',
        link: '/posts/'
      },
      {
        text: 'SLAM',
        collapsed: false,
        items: [
          { text: 'VINS Initialization', link: '/posts/2024/vins-init.html' },
          {
            text: 'IMU Preintegration', link: '/posts/2025/imu-preintegration.html'
          },
          { text: 'Spline Fusion', link: '/posts/2024/spline-fusion.html' },
          { text: 'SEIF SLAM', link: '/posts/2025/seif-slam.html' },
          { text: 'Gauge Handling', link: '/posts/2024/gauge-handling.html' },
        ]
      },
      {
        text: 'PnC',
        collapsed: false,
        items: [
          { text: 'CoTiMo Planner', link: '/posts/2024/cotimo-planner.html' }
        ]
      },
      {
        text: 'Notes',
        collapsed: false,
        items: [
          { text: 'COMP 2711', link: '/posts/2024/comp-2711.html' },
          { text: 'ELEC 3200', link: '/posts/2024/elec-3200.html' },
          {
            text: 'ELEC 5650',
            collapsed: true,
            link: '/posts/2025/elec-5650/',
            items: [
              { text: 'Math Tools', link: '/posts/2025/elec-5650/math-tools.html' },
              { text: 'Estimation', link: '/posts/2025/elec-5650/estimation.html' },
              { text: 'Kalman Filter', link: '/posts/2025/elec-5650/kalman-filter.html' },
              { text: 'LQR', link: '/posts/2025/elec-5650/lqr.html' }
            ]
          }
        ]
      },
      {
        text: 'Uncategorized',
        collapsed: false,
        items: [
          {
            text: 'BIM Localization',
            link: '/posts/2025/bim-localization.html'
          },
          { text: 'Visual Feature', link: '/posts/2025/visual-feature.html' },
          { text: 'Rotation Representation', link: '/posts/2024/rotation-representation.html' },
        ]
      }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhangzrjerry' },
      { icon: 'orcid', link: 'https://orcid.org/0009-0008-4156-1652' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/zirui-zhang-924958319/' }
    ],

    outline: {
      level: [2, 3]
    }
  },

  vite: {
    plugins: [
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