import { defineConfig } from "vitepress";
import mathjax3 from "markdown-it-mathjax3";

const customElementsForMathjax = [
  "mjx-container",
  "mjx-assistive-mml",
  "math",
  "maction",
  "maligngroup",
  "malignmark",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mi",
  "mlongdiv",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mscarries",
  "mscarry",
  "msgroup",
  "mstack",
  "msline",
  "mspace",
  "msqrt",
  "msrow",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "semantics",
  "annotation",
  "annotation-xml",
  "mprescripts",
  "none",
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "ZhangzrJerry",
  description: "My Personal Website",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["script", { src: "https://cn.vercount.one/js", defer: "true" }],
  ],
  srcDir: "src",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/icon.jpg",
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about.html" },
      { text: "Lecture", link: "/lecture/" },
      { text: "Posts", link: "https://zzhangje.github.io/" },
    ],
    search: {
      provider: "local",
    },

    sidebar: {
      "/": [
        {
          text: "Introduction",
          items: [{ text: "About Me", link: "/about.html" }],
        },
        {
          text: "Projects",
          items: [
            { text: "<b><i>FRC Alumnus</i></b>", link: "/projects/frc.html" },
            { text: "Chronos Chain", link: "/projects/25-cc.html" },
            { text: "CoTiMo Planner", link: "/projects/24-cotimo.html" },
            // { text: 'TacLoc [25\'RA-L]', link: '/projects/25-tacloc.html' }
          ],
        },
      ],
      "/lecture/": [
        {
          text: "Theory",
          items: [
            {
              text: "Kindergarten",
              items: [
                { text: "KF in 3 ways", link: "/lecture/kindergarten/kf3ways" },
                {
                  text: "EKF & UKF & PF",
                  link: "/lecture/kindergarten/ekfukfpf",
                },
                {
                  text: "Factor Graph",
                  link: "/lecture/kindergarten/factorgraph",
                },
                {
                  text: "LQR in 3 ways",
                  link: "/lecture/kindergarten/lqr3ways",
                },
                {
                  text: "LQG and its Duality",
                  link: "/lecture/kindergarten/lqgfatal",
                },
                {
                  text: "RL as Control",
                  link: "/lecture/kindergarten/rlascontrol",
                },
                { text: "L-BFGS Method", link: "/lecture/kindergarten/lbfgs" },
                { text: "Lagrangian & KKT", link: "/lecture/kindergarten/kkt" },
                {
                  text: "PHR Conic ALM",
                  link: "/lecture/kindergarten/conicalm",
                },
              ],
              link: "/lecture/kindergarten/",
              collapsed: true,
            },
            {
              text: "机器人智能控制与规划",
              link: "/lecture/optimal_control",
            }
          ],
        },
        {
          text: "Coding",
          items: [
            {
              text: "Java 面向对象远征",
              link: "/lecture/java_oop",
            },
          ]
        },
        {
          text: "Misc",
          items: [
            {
              text: "Intro to FRC",
              link: "https://frc6399.github.io/intro2frc/",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/zhangzrjerry" },
      {
        icon: "googlescholar",
        link: "https://scholar.google.com/citations?user=PCkL2rAAAAAj",
      },
      { icon: "orcid", link: "https://orcid.org/0009-0008-4156-1652" },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/in/zirui-zhang-924958319/",
      },
    ],

    outline: {
      level: [2, 3],
    },
  },

  vite: {
    plugins: [],
  },

  markdown: {
    config: (md) => {
      md.use(mathjax3, {
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\(", "\\)"],
            ["\\begin{equation}", "\\end{equation}"],
          ],
          macros: {
            red: ["{\\color{red}#1}", 1],
            blue: ["{\\color{blue}#1}", 1],
            green: ["{\\color{green}#1}", 1],
          },
        },
      });
    },
    image: {
      lazyLoading: true,
    },
  },

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElementsForMathjax.includes(tag),
      },
    },
  },

  ignoreDeadLinks: true,
});
