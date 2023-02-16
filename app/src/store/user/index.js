import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  userToken: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE(state, data) {
    state.code = data
  },
  GETLOGIN(state, data) {
    state.userToken = data.token
  },
  GETUSERINFO(state, data) {
    state.userInfo = data
  },
  LOGOUT(state) {
    removeToken()
    state.userToken = ''
    state.userInfo = {}
  }
}
const actions = {
  async getCode({ commit }, phone) {
    const result = await reqCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取验证码失败'))
    }
  },
  async userRegister(context, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code !== 200) {
      return Promise.reject(new Error(result.message))
    }
  },
  async getLogin({ commit }, data) {
    const result = await reqLogin(data)
    if (result.code === 200) {
      commit('GETLOGIN', result.data)
      setToken(result.data.token)
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('LOGOUT')
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
