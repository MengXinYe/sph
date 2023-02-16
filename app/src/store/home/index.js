import { reqcategoryList, reqBanner, reqFloor } from '@/api'

const state = {
  categoryList: [],
  banners: [],
  floors: []
}
const mutations = {
  GETCATEGORYLIST(state, data) {
    state.categoryList = data
  },
  GETBANNER(state, data) {
    state.banners = data
  },
  GETFLOOR(state, data) {
    state.floors = data
  }
}
const actions = {
  async getCategoryList({ commit }) {
    const resCategoryList = await reqcategoryList()
    if (resCategoryList.code === 200) commit('GETCATEGORYLIST', resCategoryList.data)
  },
  async getBanner({ commit }) {
    const resBanner = await reqBanner()
    if (resBanner.code === 200) commit('GETBANNER', resBanner.data)
  },
  async getFloor({ commit }) {
    const resFloor = await reqFloor()
    if (resFloor.code === 200) commit('GETFLOOR', resFloor.data)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
