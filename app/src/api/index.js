import request from './request'
import mockAjax from './mockAjax'

export const reqcategoryList = () => request.get('/product/getBaseCategoryList')

export const reqBanner = () => mockAjax.get('/banners')

export const reqFloor = () => mockAjax.get('/floors')

export const reqSearchList = (data) => request({ url: '/list', method: 'post', data })

export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'GET' })

export const addtoShoppingCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })

export const reqShopCart = () => request.get('/cart/cartList')

export const addToCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'POST' })

export const modifyCheck = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'GET' })

export const deleteSku = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })

export const reqCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, method: 'GET' })

export const reqRegister = (userInfo) => request({ url: '/user/passport/register', method: 'POST', data: userInfo })

export const reqLogin = (data) => request({ url: '/user/passport/login', method: 'POST', data })

export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'GET' })

export const reqLogout = () => request({ url: '/user/passport/logout', method: 'GET' })

export const reqUserAddress = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'GET' })

export const reqTrade = () => request({ url: '/order/auth/trade', method: 'GET' })

export const mockAdress = () => mockAjax.get('/address')

export const reqOrderSubmit = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' })

export const reqPayState = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'GET' })

export const reqMyOrder = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'GET' })
