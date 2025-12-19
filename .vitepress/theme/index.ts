// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './css/style.css'
import CenteredImg from './components/CenteredImg.vue'
import RightImg from './components/RightImg.vue'
import Badges from './components/Badges.vue'
import Giscus from './components/Giscus.vue'
import CustomHomeLayout from './components/CustomHome.vue'
import VisitorMap from './components/VisitorMap.vue'
import Revealjs from './components/Revealjs.vue'
import BetterPublications from './components/BetterPublications.vue'
import BetterExperiences from './components/BetterExperiences.vue'
import PlayerBilibili from './components/PlayerBilibili.vue'

const isDev = process.env.NODE_ENV === 'development'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () =>
        isDev ? null : [
          h('script', {
            defer: true,
            src: 'https://cloud.umami.is/script.js',
            'data-website-id': '61765fc4-2042-401e-801b-d8032e948a83',
            style: 'display:none'
          }),
          h('div', { style: 'display:none' }, [h(VisitorMap)])
        ]
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('CenteredImg', CenteredImg);
    app.component('RightImg', RightImg);
    app.component('Badges', Badges);
    app.component('Giscus', Giscus);
    app.component('custom-home', CustomHomeLayout);
    app.component('VisitorMap', VisitorMap);
    app.component('BetterPublications', BetterPublications)
    app.component('Revealjs', Revealjs);
    app.component('BetterExperiences', BetterExperiences);
    app.component('PlayerBilibili', PlayerBilibili);
  }
} satisfies Theme
