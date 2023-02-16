import axios from 'axios'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  baseURL: '/mock',
  timeout: 10000
})
requests.interceptors.request.use(function(config) {
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
