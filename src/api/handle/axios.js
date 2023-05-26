import axios from 'axios'
import axiosRetry from 'axios-retry'
import { handleNetworkError } from './errorHandle'

const requests = axios.create({
    baseURL: 'http://121.36.68.89:8008/',
    timeout: 10 * 1000,
})

// 当请求失败后，自动重新请求，只有再请求1次失败后才真正失败
axiosRetry(requests, { retries: 2 })

// 请求拦截器
requests.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json'

        // 如果需要禁用携带 token，在接口使用时候设置 noTakeToken: true 即可
        if (!config.headers.noTakeToken) {
            config.headers.Authorization = localStorage.getItem('Authorization')
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        if (res.statusText !== 'OK') {
            handleNetworkError(res.data.code)
        }
        return res.data
    },
    (error) => {
        if (error.message.includes('exceeded')) {
            handleNetworkError(502)
        } else handleNetworkError(error.response.data.code)
        return Promise.reject(`${error}`)
    }
)

export default requests
