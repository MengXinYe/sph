import { reqMyOrder } from '@/api'
const state = {}
const mutations = {}
const actions = {
  async getMyOrder({ commit }, payload) {
    const { page, limit } = payload
    const result = await reqMyOrder(page, limit)
    console.log(result)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
