import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const requests = axios.create({
  baseURL: '/api',
  timeout: 10000
})
requests.interceptors.request.use(function(config) {
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  if (store.state.user.userToken) {
    config.headers.token = store.state.user.userToken
  }
  nProgress.start()
  return config
}, function(err) {
  return Promise.reject(err)
})

requests.interceptors.response.use(response => {
  nProgress.done()
  return response.data
}, err => {
  return Promise.reject(err)
})

export default requests
