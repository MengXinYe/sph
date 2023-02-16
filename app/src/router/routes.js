
export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('@/views/Home/MXHome'), meta: { footerShow: true } },
  { path: '/login', component: () => import('@/views/Login/MXLogin'), meta: { footerShow: false } },
  { path: '/register', component: () => import('@/views/Register/MXRegister'), meta: { footerShow: false } },
  { path: '/search/:keyword?', component: () => import('@/views/Search/MXSearch'), meta: { footerShow: true, typeNavShow: true }, name: 'search' },
  { path: '/detail/:skuId', component: () => import('@/views/Detail/MXDetail'), meta: { footerShow: true, typeNavShow: true } },
  { path: '/addcartsuccess', component: () => import('@/views/AddCartSuccess/MXAddCartSuccess'), meta: { footerShow: true }, name: 'addcartsuccess' },
  { path: '/shopcart', component: () => import('@/views/ShopCart/MXShopCart'), meta: { footerShow: true } },
  {
    path: '/trade',
    component: () => import('@/views/Trade/MXTrade'),
    meta: { footerShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/views/Pay/MXPay'),
    meta: { footerShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess/MXPaySuccess'),
    meta: { footerShow: true },
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center',
    component: () => import('@/views/Center/MXCenter'),
    meta: { footerShow: true },
    children: [
      { path: '/', redirect: 'myorder' },
      { path: 'myorder', component: () => import('@/views/Center/MyOrder/MXMyOrder') },
      { path: 'grouporder', component: () => import('@/views/Center/GruopOrder/MXGroupOrder') }
    ]
  }
]
