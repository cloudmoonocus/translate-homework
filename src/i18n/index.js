import { createI18n } from 'vue-i18n'
import zh from './lang/zh'
import en from './lang/en'

const messages = {
    en,
    zh,
}
const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
const i18n = createI18n({
    locale: localStorage.getItem('lang') || language.split('-')[0] || 'en',
    fallbackLocale: 'en', // 设置备用语言
    legacy: false,
    messages,
})

export default i18n
