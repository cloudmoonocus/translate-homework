import request from './handle/axios'

// 登录方法
export function createTask(name, description, creator, document) {
    const data = JSON.stringify({
        'name': name,
        'description': description,
        'creator': creator,
        'document': document,
    })
    console.log(data, getToken())
    return request({
        url: '/createTask',
        headers: {
            isToken: true,
            // Authorization:getToken()
        },
        method: 'post',
        data: data,
    })
}

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

export function getAllTask(cp) {
    let data = {
        // currentPage:1,
        // pageSize:5
    }
    return request({
        url: '/getAllTask?currentPage=' + cp + '&pageSize=10',
        headers: {
            isToken: true,
            // Authorization:getToken()
        },
        method: 'GET',
    })
}

export function claimTask(userId, taskId, reviewer) {
    const data = {
        'userId': userId,
        'taskId': taskId,
        'claimWay': reviewer,
    }
    console.log(data)
    return request({
        url: '/claimTask',
        method: 'post',
        data: data,
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
