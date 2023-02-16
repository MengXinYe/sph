/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from '../App.vue'
import router from '@/router'
import store from '@/store'
import * as API from '@/api'
import VueLazyload from 'vue-lazyload'

import '@/mock/mockServe'

import 'swiper/css/swiper.css'

import { Input, Button, MessageBox, Message, Form, FormItem } from 'element-ui'

import TypeNav from '@/components/TypeNav/MXTypeNav'
import Carsouel from '@/components/Carsouel/MXCarsouel'
import Pagination from '@/components/Pagination/MXPagination'

Vue.use(VueLazyload, {
  loading: import('@/assets/atm.gif').then(v => v).catch(() => {})
})

Vue.component('el-input', Input)
Vue.component('el-button', Button)
Vue.component('el-form', Form)
Vue.component(FormItem.name, FormItem)

Vue.component(Pagination.name, Pagination)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsouel.name, Carsouel)

Vue.config.productionTip = false

Vue.prototype.$MessageBox = MessageBox
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$api = API
    Vue.prototype.$bus = this
  }
}).$mount('#app')
