import axios from 'axios'
import axiosRetry from 'axios-retry'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { handleNetworkError } from './errorHandle'

const requests = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10 * 1000,
})

// 当请求失败后，自动重新请求，只有再请求2次失败后才真正失败
axiosRetry(requests, { retries: 2 })

// 请求拦截器
requests.interceptors.request.use(
    (config) => {
        config.headers = { 'Content-Type': 'application/json' }
        nprogress.start()
        config.headers.Authorization = localStorage.getItem('Authorization')
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        nprogress.done()
        if (!res.data.success) {
            handleNetworkError(res.data.errCode)
        }
        return res.data
    },
    (error) => {
        handleNetworkError(error.response.status)
        return Promise.reject(new Error(`请求失败:${error}`))
    }
)

export default requests
