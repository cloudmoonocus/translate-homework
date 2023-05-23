import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const id = ref(localStorage.getItem('id'))
    const token = ref(localStorage.getItem('Authorization'))
    const userInfor = ref({
        id: '',
        username: '加载中...',
        email: '加载中...',
        contribution: 0,
        role: 'user',
        giteeEmail: '',
        task: [],
        record: {},
    })
    const currentTaskID = ref(0)

    return { id, token, userInfor, currentTaskID }
})
