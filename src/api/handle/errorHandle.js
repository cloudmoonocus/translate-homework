import { inforReset } from '../../utils/inforReset'

export const handleNetworkError = (data) => {
    const errStatus = data.code
    let errMessage = '未知错误'
    if (errStatus) {
        switch (errStatus) {
            case 400:
                errMessage = '错误的请求'
                break
            case 401:
            case 402:
                inforReset()
                errMessage = '未授权，请登录'
                break
            case 403:
                errMessage = '拒绝访问'
                inforReset()
                break
            case 404:
                errMessage = '您请求的资源不存在'
                break
            case 405:
                errMessage = '该请求方法未允许'
                break
            case 408:
                errMessage = '请求超时'
                break
            case 500:
                errMessage = '服务端出错'
                break
            case 501:
                errMessage = '网络未实现'
                break
            case 502:
                errMessage = '网络错误'
                break
            case 503:
                errMessage = '服务端不可用'
                break
            case 504:
                errMessage = '网络超时'
                break
            case 505:
                errMessage = 'HTTP 版本不支持该请求'
                break
            default:
                errMessage = data.msg
        }
    } else {
        errMessage = `无法连接到服务器!`
    }

    ElNotification({
        title: '发生了错误',
        message: errMessage,
        type: 'error',
    })
}
