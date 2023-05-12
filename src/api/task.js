import request from './handle/axios'

// 新建任务
export function createTask(name, description, creator, document) {
    const data = {
        'name': name,
        'description': description,
        'creator': creator,
        'document': document,
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
        'taskId': taskId,
        'presentUsername': presentUsername,
    }
    return request({
        url: '/deleteTask',
        headers: {
            noTakeToken: true,
        },
        method: 'post',
        data: data,
    })
}

// 获取所有任务
export function getAllTask(cp, pageSize = 999999) {
    return request({
        url: '/getAllTask?currentPage=' + cp + '&pageSize=' + pageSize,
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

export function getTask(id) {
    const data = {
        'id': id,
    }
    return request({
        url: '/getTask',
        method: 'post',
        data: data,
    })
}

// export function deleteTask(id,username) {
//     const data = {
//         "id": id,
// 		"presentUsername":username
//         }
//     return request({
//         url: '/deleteTask',
//         headers: {
//             noTakeToken: true,
//             Authorization:getToken()
//         },
//         method: 'post',
//         data:data
//     })
// }

export function submitTask(taskId, userId) {
    const data = {
        'taskId': taskId,
        'userId': userId,
    }
    return request({
        url: '/submitTask',
        headers: {
            noTakeToken: true,
        },
        method: 'post',
        data: data,
    })
}

export function updateTask(id, name, document) {
    const data = {
        'id': id,
        'name': name,
        'document': document,
    }
    return request({
        url: '/updateTask',
        headers: {
            noTakeToken: true,
        },
        method: 'post',
        data: data,
    })
}

export function getTask1(userId, taskId) {
    const data = {
        'userId': userId,
        'taskId': taskId,
    }
    return request({
        url: '/submitTask',
        headers: {
            noTakeToken: true,
        },
        method: 'post',
        data: data,
    })
}

export function getRelation(cu) {
    // const data =
    //     {
    //         "currentPage":cu,
    //         "pageSize":20
    //     }

    return request({
        url: '/relation?currentPage=' + cu + '&pageSize=10',
        headers: {
            noTakeToken: true,
        },
        method: 'GET',
    })
}
