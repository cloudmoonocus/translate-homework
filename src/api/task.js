import request from './handle/axios'

// 新建任务
export function createTask(name, description, creator, document) {
    const data = {
        name,
        description,
        creator,
        document,
    }
    return request({
        url: '/createTask',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 删除任务
export function deleteTask(taskId, presentUsername) {
    const data = {
        taskId,
        presentUsername,
    }
    return request({
        url: '/deleteTask',
        method: 'post',
        data: data,
    })
}

// 获取所有任务
export function getAllTask(cp, pageSize = 999) {
    return request({
        url: '/getAllTask?currentPage=' + cp + '&pageSize=' + pageSize,
        method: 'GET',
    })
}

// 获取用户和任务的对应关系
export function getRelation(currentPage, pageSize = 999) {
    return request({
        url: '/relation?currentPage=' + currentPage + '&pageSize=' + pageSize,
        method: 'GET',
    })
}

// 认领任务
export function claimTask(userId, taskId, claimWay) {
    const data = {
        userId,
        taskId,
        claimWay,
    }
    return request({
        url: '/claimTask',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 获取任务信息
export function getTask(id) {
    const data = {
        id,
    }
    return request({
        url: '/getTask',
        method: 'post',
        data: data,
    })
}

// 提交任务
export function submitTask(userId, taskId) {
    const data = {
        userId,
        taskId,
    }
    return request({
        url: '/submitTask',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 更新任务
export function updateTask(id, name, document) {
    const data = {
        id,
        name,
        document,
    }
    return request({
        url: '/updateTask',
        method: 'post',
        data: JSON.stringify(data),
    })
}
