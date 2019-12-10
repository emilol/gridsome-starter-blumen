import DefaultLayout from '~/layouts/Default.vue'
import Vue from 'vue'
import VueDisqus from 'vue-disqus'

Vue.use(VueDisqus)

export default function (Vue, { head, router }) {
  router.beforeEach((to, from, next) => {
    // Do stuff before next page load
    next()
  })

  Vue.component('Layout', DefaultLayout)

  head.htmlAttrs = { lang: 'en', class: 'h-full' }
  head.bodyAttrs = { class: 'antialiased font-serif language-xxxx' }

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Fira+Sans:400,700%7CCardo'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/themes/prism.min.css'
  })
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.17.1/plugins/line-highlight/prism-line-highlight.min.css'
  })
}
