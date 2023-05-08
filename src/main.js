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

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(createPinia())
app.use(i18n)

app.mount('#app')

const userData = useUserStore()

// 获取用户信息
const isLogin = !!localStorage.getItem('Authorization')
if (isLogin) {
    getInfo(localStorage.getItem('id')).then((val) => {
        if (val.code === 200) {
            userData.userInfor = val.data
        }
    })
}
