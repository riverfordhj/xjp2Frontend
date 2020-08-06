/*
 * @Descripttion: 1
 * @version: 1
 * @Author: KanMing
 * @Date: 2019-05-24 09:21:57
 * @LastEditors: KanMing
 * @LastEditTime: 2019-09-25 19:30:08
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// import * as VueWindow from '@hscmap/vue-window'
import * as VueMenu from '@hscmap/vue-menu'

// Vue.use(VueWindow)
Vue.use(VueMenu)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

// set ElementUI lang to EN
Vue.use(ElementUI, {
  // locale
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
