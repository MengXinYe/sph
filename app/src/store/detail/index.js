import { reqGoodsInfo, addtoShoppingCart } from '@/api'
import { UUID } from '@/utils/uuid_token'
const state = {
  goodsInfo: {},
  uuid_token: UUID()
}
const mutations = {
  GETGOODSINFO(state, data) {
    state.goodsInfo = data
  }
}
const actions = {
  async getGoodsInfo({ commit }, skuId) {
    const resGoodsInfo = await reqGoodsInfo(skuId)
    if (resGoodsInfo.code === 200) {
      commit('GETGOODSINFO', resGoodsInfo.data)
    }
  },
  async addShopCart({ commit }, { skuId, skuNum }) {
    const result = await addtoShoppingCart(skuId, skuNum)
    if (result.code === 200) return 'ok'
    return Promise.reject(new Error(result.message))
  }
}
const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
