import axios from 'axios'
import { useMessage } from 'naive-ui'
import router from '@/router'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器：添加 token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：处理 401 和错误提示
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    } else if (error.response?.data?.message) {
      const msg = Array.isArray(error.response.data.message)
        ? error.response.data.message[0]
        : error.response.data.message
      // 错误提示由调用方处理
    } else if (error.response?.data?.error) {
      // 错误提示由调用方处理
    }
    return Promise.reject(error)
  }
)

export default api
