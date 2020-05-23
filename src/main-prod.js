import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// import './plugins/element.js'
import { Row, Col, Card, Select, Option, Footer, Dialog, Pagination, Input, Form, FormItem, Message, Button } from 'element-ui'
import VueCropper from 'vue-cropper'

import './assets/styles/index.scss'
// import 'element-ui/lib/theme-chalk/display.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import FastClick from 'fastclick'
import moment from 'moment'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import VueCookie from 'vue-cookie'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueLazyload from 'vue-lazyload'
import Loading from './components/Loading.vue'
import filters from '@/util'
Vue.component('Loading', Loading)
Vue.use(VueLazyload, {
  loading: './assets/img/Sakura.png'
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAJ2P9Vsfu9p91zeBVFF-JnVinq5yrM-ZY',
    // key: 'AIzaSyDrmorx1AmxtzBg0CvJm4kvidLrPvd57_c',
    libraries: 'places'
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
})
Vue.use(VueCookie)
Vue.use(vuescroll)
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY年MM月DD日') {
  return moment(dataStr, 'YYYY-MM-DD').format(pattern)
})
for (const key in filters) {
  Vue.filter(key, filters[key])
}
Vue.use(VueClipboard)
Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.use(VueCropper)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(Footer)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem) // 引入插件
// 解决移动端点击延迟200ms的问题

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
// 弹出框禁止滑动
Vue.prototype.noScroll = function () {
  const mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止页面滑动
}

// 弹出框可以滑动
Vue.prototype.canScroll = function () {
  const mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = '' // 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
