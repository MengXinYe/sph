import { reqSearchList } from '@/api/index'
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, data) {
    state.searchList = data
  }
}
const actions = {
  async getSearchList({ commit }, searchParams) {
    const result = await reqSearchList(searchParams)
    if (result.code === 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const getters = {
  attrsList: state => state.searchList.attrsList || [],
  goodsList: state => state.searchList.goodsList || [],
  trademarkList: state => state.searchList.trademarkList || []
}
export default {
  state,
  mutations,
  actions,
  getters
}
