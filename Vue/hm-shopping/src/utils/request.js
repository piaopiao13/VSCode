import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 创建一个新的axios实例，对实例进行自定义配置
// 好处：不会污染原始的axios实例，且可以创建多个实例，分别进行不同的配置
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api/',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 自定义配置 - 请求/响应 拦截器
// 请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '请求中...',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })

  // 授权页面需要携带token
  const token = store.getters.token
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`
    config.headers['Access-Token'] = token
  }

  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  const res = response.data
  if (res.status !== 200) {
    // 提示
    Toast(res.message || '请求失败')
    // 抛出错误
    return Promise.reject(new Error(res.message || '请求失败'))
  }

  Toast.clear()
  return res
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
