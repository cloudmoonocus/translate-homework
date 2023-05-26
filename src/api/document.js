import request from './handle/axios'

// 解析Url创建文档
export function createByGitUrl(data) {
    return request({
        url: '/createByGitUrl',
        method: 'post',
        data: JSON.stringify(data),
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
        data: JSON.stringify(data),
    })
}

// 删除文档
export function deleteDocumentById(id) {
    const data = {
        id,
    }
    return request({
        url: '/deleteDocumentById',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 获取文档列表
export function getAllDocument(currentPage, pagesize = 999999) {
    return request({
        url: '/getAllDocument?currentPage=' + currentPage + '&pageSize=' + pagesize,
        method: 'GET',
    })
}

// 获取文档
export function getDocument(id) {
    let data = {
        id,
    }
    return request({
        url: '/getDocument',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 修改文档信息
export function updateDocument(data) {
    return request({
        url: '/updateDocument',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 保存文档
export function updateAllContent(documentId, contentList) {
    let data = {
        documentId,
        contentList,
    }
    return request({
        url: '/updateAllContent',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 修改语句
export function updateContent(documentId, sentenceId, sourceText, targetText) {
    let data = {
        documentId,
        sentenceId,
        sourceText,
        targetText,
    }
    return request({
        url: '/updateContent',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 全局搜索句子
export function searchAllContent(id, text) {
    return request({
        url: '/searchContent?id=' + id + '&text=' + text,
        method: 'GET',
    })
}

// 文档内搜索句子
export function searchDocContent(documentId, text) {
    return request({
        url: '/search/byIdAndText?documentId=' + documentId + '&text=' + text,
        method: 'GET',
    })
}

// 搜索文档
export function documentSearch(item) {
    let data = {
        id: item.id,
        name: item.name,
    }
    return request({
        url: '/documentSearch',
        method: 'GET',
        data: JSON.stringify(data),
    })
}

//下载翻译后的文档
export function downloadDocument(docId) {
    return request({
        url: '/downloadDocument?id=' + docId,
        method: 'GET',
    })
}

// gitee更新文档
export function updateGitDocument(id) {
    let data = {
        id,
    }
    return request({
        url: '/updateGitDocument',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 上传文档至 Gitee
export function pushDocument(id, path, commitMsg) {
    let data = {
        id,
        path,
        commitMsg,
    }
    return request({
        url: '/pushDocument',
        method: 'POST',
        data: JSON.stringify(data),
    })
}

// 获取该仓库所有分支
export function getAllBranch(fullName) {
    return request({
        url: '/getAllBranch?fullName=' + fullName,
        method: 'GET',
    })
}

// 获取仓库目录+文件
export function getRepositoryFile(fullName, branch = 'master', path = '/') {
    return request({
        url: '/getRepositoryFile?fullName=' + fullName + '&branch=' + branch + '&path=' + path,
        method: 'GET',
    })
}

// 获取仓库目录
export function getRepositoryFolder(fullName, branch = 'master', path = '/') {
    return request({
        url: '/getRepositoryFolder?fullName=' + fullName + '&branch=' + branch + '&path=' + path,
        method: 'GET',
    })
}
