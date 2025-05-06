// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import 'virtual:uno.css'
import CenteredImg from './components/CenteredImg.vue'
import RightImg from './components/RightImg.vue'
import Badges from './components/Badges.vue'
import Giscus from './components/Giscus.vue'
import CustomHomeLayout from './components/CustomHome.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h('div', { style: { display: 'none' } }, [
        h('img', { src: 'https://www.clustrmaps.com/map_v2.png?d=N1xcGfMiyGqEOR9TZz2PRIL6pBhRmMh98RoCJonFmW4&cl=ffffff' })
      ])
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('CenteredImg', CenteredImg);
    app.component('RightImg', RightImg);
    app.component('Badges', Badges);
    app.component('Giscus', Giscus);
    app.component('custom-home', CustomHomeLayout);
  }
} satisfies Theme
