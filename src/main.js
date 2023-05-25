import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/icons/iconfont.css'
import 'normalize.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from './i18n'
import { getInfo } from './api/user'
import { useUserStore } from './stores/user'
import message from './utils/message'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia())
app.use(i18n)

let loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '加载中... 请稍后',
    background: 'transparent',
})

// 获取用户信息
const defineAsync = new Promise((resolve, reject) => {
    const userData = useUserStore()
    const isLogin = !!localStorage.getItem('Authorization')
    if (isLogin) {
        getInfo(localStorage.getItem('id')).then((val) => {
            if (val.code === 200) {
                userData.userInfor = val.data
                resolve()
            } else reject()
        }, reject)
    } else resolve()
})
defineAsync
    .then(null, () => {
        message.error('发生了错误')
    })
    .finally(() => {
        loadingInstance.close()
        app.use(router)
        app.mount('#app')
    })

// TODO 修改一下所有使用到分页的页面
