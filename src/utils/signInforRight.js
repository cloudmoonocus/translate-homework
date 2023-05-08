export function signInforRight(data) {
    const { name = '', email = '', password = '', repeatPassword = '', isRegister } = data
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

    return new Promise((resolve, reject) => {
        // 验证用户名
        if (!name || name.length < 4 || name.length > 20) {
            reject('用户名不能为空且长度在 4 和 20 之间')
        }

        // 验证邮箱
        if ((!email || !reg.test(email)) && isRegister) {
            reject('邮箱格式错误')
        }

        // 验证密码
        if (!password || password.length < 5 || password.length > 25) {
            reject('密码不能为空且长度在 5 和 25 之间')
        }

        // 验证是否重复密码
        if ((!repeatPassword || repeatPassword !== password) && isRegister) {
            reject('前后密码不一致')
        }

        resolve(true)
    })
}
