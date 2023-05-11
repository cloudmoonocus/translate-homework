import request from './handle/axios'

// 解析Url创建文档
export function createByUrl(data) {
    return request({
        url: '/createByUrl',
        method: 'post',
        data: data,
    })
}

// 上传文本创建文档
export function createByText(name, sourceLang, targetLang, text) {
    const data = {
        'name': name,
        'sourceLang': sourceLang,
        'targetLang': targetLang,
        'text': text,
    }
    return request({
        url: '/createByText',
        method: 'post',
        data: data,
    })
}

// 获取文档列表
export function getAllDocument(cu, pagesize = 999999) {
    return request({
        url: '/getAllDocument?currentPage=' + cu + '&pageSize=' + pagesize,
        method: 'GET',
    })
}

// 获取文档
export function getDocument(id) {
    let data = {
        'id': id,
    }
    return request({
        url: '/getDocument',
        headers: {
            isToken: true,
        },
        method: 'POST',
        data: data,
    })
}

// 更新文档
export function updateDocument(id, name, sourceLang, targetLang, wordSum, translationSum, reviewSum) {
    let data = {
        'id': id,
        'name': name,
        'sourceLang': sourceLang,
        'targetLang': targetLang,
        'wordSum': wordSum,
        'translationSum': translationSum,
        'reviewSum': reviewSum,
    }
    return request({
        url: '/updateDocument',
        headers: {
            isToken: true,
        },
        method: 'POST',
        data: data,
    })
}
export function updateAllDocument(documentId, contentList) {
    let data = {
        'documentId': documentId,
        'contentList': contentList,
    }
    return request({
        url: '/updateAllContent',
        headers: {
            isToken: true,
        },
        method: 'POST',
        data: data,
    })
}

// 修改语句
export function updateContent(documentId, sentenceId, sourceText, targetText) {
    let data = {
        'documentId': documentId,
        'sentenceId': sentenceId,
        'sourceText': sourceText,
        'targetText': targetText,
    }
    return request({
        url: '/updateContent',
        headers: {
            isToken: true,
        },
        method: 'POST',
        data: data,
    })
}

export function searchContent(id, lang, sourceText, targetText) {
    let data = {
        'documentId': documentId,
        'sentenceId': sentenceId,
        'sourceText': sourceText,
        'targetText': targetText,
    }
    return request({
        url: '/searchContent',
        headers: {
            isToken: true,
        },
        method: 'POST',
        data: data,
    })
}

export function documentSearch(item) {
    console.log('请求具体部分')
    console.log(item)
    let data = {
        'id': item.id,
        'name': item.name,
    }
    return request({
        url: '/documentSearch',
        headers: {
            isToken: true,
        },
        method: 'GET',
        data: data,
    })
}
