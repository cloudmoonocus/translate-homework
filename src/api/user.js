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

// 获取全部信用户息
export function getAllInfo(currentPage, size = 999) {
    return request({
        url: '/getAllInfo?currentPage=' + currentPage + '&pageSize=' + size,
        method: 'GET',
    })
}

//修改用户信息
export function changeInfo(data) {
    return request({
        url: '/changeInfo',
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
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 删除用户
export function deleteUserId(id) {
    let data = {
        'id': id,
    }
    return request({
        url: '/deleteUserById',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 绑定gitee账户
export function bindingGitee(userId, email, password) {
    let data = {
        userId,
        email,
        password,
    }
    return request({
        url: '/bindingGitee',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 获取该Gitee的所有仓库
export function getAllGiteeRepository(id, currentPage, size = 999) {
    return request({
        url: '/getAllGiteeRepository?id=' + id + '&currentPage=' + currentPage + '&pageSize=' + size,
        method: 'GET',
    })
}
