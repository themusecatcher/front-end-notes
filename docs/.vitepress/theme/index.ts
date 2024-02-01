import DefaultTheme from 'vitepress/theme'
import './global.less' // global less
import VueLazyLoad from 'vue3-lazyload'
import Default from '/default.jpg'
import VueAmazingUI from 'vue-amazing-ui'
import 'vue-amazing-ui/css'

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp({ app }) {
    app.use(VueLazyLoad, {
      // options...
      loading: Default,
      error: Default
      // lifecycle: {
      //   loading: (el) => {
      //     console.log('loading', el)
      //   },
      //   error: (el) => {
      //     console.log('error', el)
      //   },
      //   loaded: (el) => {
      //     console.log('loaded', el)
      //   }
      // }
    }).use(VueAmazingUI)
  },
}
