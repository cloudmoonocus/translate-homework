import request from './handle/axios'

// 机器翻译
export function mt(text, from, to) {
    const data = {
        'text': text,
        'from': from,
        'to': to,
    }
    return request({
        url: '/mt',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 拼写检查
export function hunspell(text, language) {
    const data = {
        'text': text,
        'language': language,
    }
    return request({
        url: '/hunspell',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 拼写检查
export function tmSearch(text, srcLang, tgtLang, similarity = 0, caseSensitive = false) {
    const data = {
        'text': text,
        'srcLang': srcLang,
        'tgtLang': tgtLang,
        'similarity': similarity,
        'caseSensitive': caseSensitive,
    }
    return request({
        url: '/tmSearch',
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 语法检查
export function check(text) {
    const data = {
        text,
    }
    return request({
        url: '/check',
        method: 'post',
        data: JSON.stringify(data),
    })
}
