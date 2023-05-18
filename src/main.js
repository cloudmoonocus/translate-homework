import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
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

// 获取用户信息
const defineAsync = new Promise((resolve, reject) => {
    const userData = useUserStore()
    const isLogin = !!localStorage.getItem('Authorization')
    if (isLogin) {
        getInfo(localStorage.getItem('id')).then((val) => {
            if (val.code === 200) {
                userData.userInfor = val.data
                resolve()
            } else {
                reject()
            }
        })
    }
})
defineAsync
    .then(null, () => {
        message.danger('发生了错误')
    })
    .finally(() => {
        app.use(router)
        app.mount('#app')
    })
