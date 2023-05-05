import request from './handle/axios'

// 机器翻译
export function mt(text, from, to) {
    const data = {
        'text': text,

        'from': from,

        'to': to,
    }
    console.log(data)
    return request({
        url: '/mt',
        headers: {
            isToken: true,
        },
        method: 'post',
        data: data,
    })
}

// 拼写检查
export function hunspell(text, language) {
    const data = {
        'text': text,
        'language': language,
    }
    console.log(getToken())
    console.log(data)
    return request({
        url: '/hunspell',
        headers: {
            isToken: true,
        },
        method: 'post',
        data: data,
    })
}

// 拼写检查
export function tmSearch(text, srcLang, tgtLang, similarity, caseSensitive) {
    const data = {
        'text': text,

        'srcLang': srcLang,

        'tgtLang': tgtLang,

        'similarity': similarity,

        'caseSensitive': caseSensitive,
    }
    console.log(data)
    return request({
        url: '/tmSearch',
        headers: {
            isToken: true,
        },
        method: 'post',
        data: data,
    })
}

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
        data: data,
    })
}
