import request from './handle/axios'

// 登录方法
export function login(data) {
    return request({
        url: '/login',
        headers: {
            noTakeToken: true,
        },
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 注册方法
export function register(data) {
    return request({
        url: '/register',
        headers: {
            noTakeToken: true,
        },
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 登出
export function loginout(data) {
    return request({
        url: '/logout',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 获取信息
export function getInfo(id) {
    let data = {
        id,
    }

    return request({
        url: '/getInfo',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 获取全部信息
export function getAllInfo(cu, size = 9999999999) {
    return request({
        url: '/getAllInfo?currentPage=' + cu + '&pageSize=' + size,
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
        method: 'POST',
        data: data,
    })
}

//修改用户信息
export function changeInfo(data) {
    return request({
        url: '/changeinfo',
        data: JSON.stringify(data),
        method: 'POST',
    })
}

// 管理端新增用户
export function addUserAdmin(username, password, email, role) {
    role = role ? 'root' : 'user'
    let data = {
        username: username,
        password: password,
        email: email,
        role: role,
    }
    return request({
        url: '/addUserAdmin',
        data: JSON.stringify(data),
        method: 'POST',
    })
}

// 删除用户
export function deleteUserId(id) {
    let data = {
        'id': id,
    }
    return request({
        url: '/deleteUserById',
        data: JSON.stringify(data),
        method: 'POST',
    })
}
