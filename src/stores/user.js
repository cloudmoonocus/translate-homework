import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userName = ref(localStorage.getItem('userName'))
    const id = ref(localStorage.getItem('id'))
    const token = ref(localStorage.getItem('Authorization'))
    const userInfor = ref({
        'id': '',
        'username': '加载中...',
        'email': '加载中...',
        'contribution': 0,
        'role': 'user',
        'task': [],
        'record': {},
    })

    return { userName, id, token, userInfor }
})
