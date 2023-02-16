import { reqUserAddress, reqTrade, mockAdress, reqOrderSubmit } from '@/api'
const state = {
  userAddress: [],
  tradeInfo: {},
  mockUserAddress: []
}
const mutations = {
  GETUSERADDRESS(state, data) {
    state.userAddress = data
  },
  GETTRADE(state, data) {
    state.tradeInfo = data
  },
  GETMOCKADDRESS(state, data) {
    state.mockUserAddress = data
  }
}
const actions = {
  async getUserAddress({ commit }) {
    const result = await reqUserAddress()
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
    console.log(result)
  },
  async getTrade({ commit }) {
    const result = await reqTrade()
    if (result.code === 200) {
      commit('GETTRADE', result.data)
    }
    console.log(result)
  },
  async getMockAddress({ commit }) {
    const result = await mockAdress()
    if (result.code === 200) {
      commit('GETMOCKADDRESS', result.data)
    }
  },
  async getOrderSubmit({ commit }, payload) {
    const { tradeNo, data } = payload
    await reqOrderSubmit(tradeNo, data)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
