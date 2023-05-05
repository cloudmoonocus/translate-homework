import request from './handle/axios'

// 登录方法
export function relation() {
    // const data = {
    //     "name": name,
    //     "description": description,
    //     "creator": creator,
    //     "document": document
    // }
    return request({
        url: '/relation',
        headers: {
            isToken: true,
            Authorization: getToken(),
        },
        method: 'GET',
        // data:data
    })
}
