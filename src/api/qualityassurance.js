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
        headers: {
            isToken: true,
        },
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
        headers: {
            isToken: true,
        },
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
        headers: {
            isToken: true,
        },
        method: 'post',
        data: JSON.stringify(data),
    })
}

// 语法检查
export function check(text) {
    const data = {
        'text': text,
    }
    console.log(data)
    return request({
        url: '/check',
        headers: {
            isToken: false,
        },
        method: 'post',
        data: JSON.stringify(data),
    })
}
