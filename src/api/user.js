import request from './handle/axios'

// 登录方法
export function login(data) {
    let data_ = {
        'username': data.username,
        'password': data.password,
    }
    return request({
        url: '/login',
        headers: {
            isToken: false,
        },
        method: 'post',
        data: data_,
    })
}

// 注册方法
export function register(data) {
    let data_ = {
        'username': data.username,

        'password': data.password,

        'email': data.email,
    }
    return request({
        url: '/register',
        headers: {
            isToken: false,
        },
        method: 'post',
        data: data_,
    })
}

// 登出
export function loginout(data) {
    return request({
        url: '/logout',
        headers: {
            isToken: true,
        },
        method: 'post',
        data: data,
    })
}

// 获取信息
export function getoInfo(data) {
    // console.log(data);
    // console.log(getToken())
    // debugger
    // let data_ = JSON.stringify({
    //     "id": 1
    // });
    // return request({
    //     url: '/getInfo',
    //     headers: {
    //         'Authorization': getToken(),
    //         'Content-Type': 'application/json'
    //     },
    //     method: 'POST',
    //     data: data_
    // })
    var axios = require('axios')
    var data = JSON.stringify({
        'id': data.id,
    })

    var config = {
        method: 'post',
        url: '/getInfo',
        headers: {
            'Authorization': getToken(),
            'Content-Type': 'application/json',
        },
        data: data,
    }
    return axios(config)
}

// 获取全部信息
export function getAllInfo(cu) {
    return request({
        url: '/getAllInfo?currentPage=' + cu + '&pageSize=10',
        headers: {
            isToken: true,
        },
        method: 'GET',
    })
}

// 修改密码
export function alterPassword(id, oldPassword, newPassword1, newPassword2) {
    let data = {
        'id': id,
        'oldPassword': oldPassword,
        'newPassword1': newPassword1,
        'newPassword2': newPassword2,
    }
    return request({
        url: '/alterPassword',
        headers: {
            isToken: true,
            Authorization: getToken(),
        },
        method: 'POST',
        data: data,
    })
}

//修改用户信息
export function changeInfo(id, username, role, oldPassword, newPassword, email) {
    let data = {
        id: id,
        username: username,
        role: role,
        oldPassword: oldPassword,
        newPassword: newPassword,
        email: email,
    }
    return request({
        url: '/changeinfo',
        headers: {
            isToken: true,
        },
        data: data,
        method: 'POST',
    })
}

//管理端新增用户
export function addUserAdmin(username, role, password, email) {
    let data = {
        username: username,
        role: role,
        password: password,
        email: email,
    }
    return request({
        url: '/addUserAdmin',
        headers: {
            isToken: true,
        },
        data: data,
        method: 'POST',
    })
}
export function deleteUserId(id) {
    let data = {
        'id': id,
    }
    return request({
        url: '/deleteUserById',
        headers: {
            isToken: true,
        },
        data: data,
        method: 'POST',
    })
}
