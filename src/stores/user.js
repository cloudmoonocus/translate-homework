import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userName = ref(localStorage.getItem('userName'))
    const id = ref(localStorage.getItem('id'))
    const token = ref(localStorage.getItem('Authorization'))

    return { userName, id, token }
})
