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
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { Analytics } from '@vercel/analytics/vue'
import BetterExperiences from './components/BetterExperiences.vue'
import PlayerBilibili from './components/PlayerBilibili.vue'
import ExternalGo from './components/ExternalGo.vue'

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
          h('div', { style: 'display:none' }, [h(VisitorMap), h(SpeedInsights), h(Analytics)])
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
    app.component('ExternalGo', ExternalGo);

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const rewrite = () => {
        const as = Array.from(document.querySelectorAll('a')) as HTMLAnchorElement[]
        const origin = window.location.origin
        as.forEach(a => {
          const href = a.getAttribute('href') || ''
          if (!href) return
          if (a.hasAttribute('data-skip-go')) return
          if (href.startsWith('/go')) return
          if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return
          if (href.startsWith('http')) {
            if (!href.startsWith(origin)) {
              const to = encodeURIComponent(href)
              a.setAttribute('href', `/go/?to=${to}`)
              a.removeAttribute('target')
              a.removeAttribute('rel')
            }
          }
        })
      }

      router.onAfterRouteChange = () => rewrite()
      setTimeout(() => rewrite(), 0)
    }
  }
} satisfies Theme
