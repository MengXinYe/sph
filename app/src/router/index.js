import Vue from 'vue'
import Router from 'vue-router'

import routes from '@/router/routes'
import store from '@/store'

Vue.use(Router)

const originPush = Router.prototype.push
const originReplace = Router.prototype.replace
Router.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    )
  }
}
Router.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    )
  }
}

const router = new Router({
  routes,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) return savePosition
    else return { y: 0 }
  }
})

const unauthorized = ['/search', '/login', '/home', '/register']

router.beforeEach((to, from, next) => {
  if (store.state.user.userToken) {
    if (to.path === '/login' || to.path === '/register') next('/home')
    if (!store.state.user.userInfo.name) {
      store.dispatch('getUserInfo').catch(function() {
        store.dispatch('logout')
        next('/')
      })
    }
  } else {
    const agreeVisit = unauthorized.findIndex(item => item === to.path)
    if (agreeVisit !== -1) {
      next()
    } else {
      next(`/login?redict=${to.path}`)
    }
  }

  next()
})

export default router
