import { useUserStore } from '../stores/user.js'
import router from '../router'

export function inforReset() {
    const userData = useUserStore()
    localStorage.clear()
    userData.id = ''
    userData.token = ''
    userData.userName = ''
    router.replace('/signin')
}
