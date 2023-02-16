import { reqShopCart, addToCart, modifyCheck, deleteSku } from '@/api'
const state = {
  shopCart: []
}
const mutations = {
  GETSHOPCART(state, data) {
    state.shopCart = data
  }
}
const actions = {
  async getShopCart({ commit }) {
    const result = await reqShopCart()
    if (result.code === 200) {
      commit('GETSHOPCART', result.data)
    }
  },
  async updatedNum({ commit }, { skuId, skuNum }) {
    const result = await addToCart(skuId, skuNum)
    return result.code === 200 ? '修改成功' : Promise.reject(new Error('修改失败'))
  },
  async updateCheck({ commit }, { skuId, isChecked }) {
    await modifyCheck(skuId, isChecked)
  },
  async updateSku({ commit }, { skuId }) {
    await deleteSku(skuId)
  }
}
const getters = {
  getData(state) {
    return state.shopCart[0] || {}
  },
  getShopCarts(state, getter) {
    return getter.getData.cartInfoList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
