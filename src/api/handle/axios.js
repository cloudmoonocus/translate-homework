import axios from 'axios'
import axiosRetry from 'axios-retry'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { handleNetworkError } from './errorHandle'

const requests = axios.create({
    baseURL: 'http://121.36.68.89:8008/',
    timeout: 10 * 1000,
})

// 当请求失败后，自动重新请求，只有再请求2次失败后才真正失败
axiosRetry(requests, { retries: 2 })

// 请求拦截器
requests.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json'

        // 如果需要禁用请求进度条，在接口使用时候设置 disableNprogress: true 即可
        if (!config.headers.disableNprogress) {
            nprogress.start()
        }

        // 同理，判断是否需要携带 token
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
        nprogress.done()
        if (res.statusText !== 'OK') {
            handleNetworkError(res.data.code)
        }
        return res.data
    },
    (error) => {
        if (error.message.includes('exceeded')) {
            handleNetworkError(502)
        } else handleNetworkError(error.response.status)
        return Promise.reject(new Error(`请求失败:${error}`))
    }
)

export default requests
