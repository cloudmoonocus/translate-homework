import { createRouter, createWebHistory } from 'vue-router'
import { ElLoading } from 'element-plus'
import message from '../utils/message'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('../views/Home.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: '/signin',
        component: () => import('../views/SignIn.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: '/signup',
        component: () => import('../views/SignUp.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: '/userInfor',
        component: () => import('../views/UserInfor.vue'),
        meta: {
            requireAuth: true,
        },
    },
    {
        path: '/tsl',
        component: () => import('../views/translate/Index.vue'),
        meta: {
            requireAuth: true,
        },
        children: [
            {
                path: 'mt',
                component: () => import('../views/translate/MT.vue'),
            },
            {
                path: 'sc',
                component: () => import('../views/translate/SC.vue'),
            },
            {
                path: 'ta',
                component: () => import('../views/translate/TA.vue'),
            },
        ],
    },
    {
        path: '/404',
        component: () => import('../views/404.vue'),
        meta: {
            requireAuth: false,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, left: 0 }
        }
    },
    routes,
})

// 全局路由前置守卫
let loadingInstance = null
router.beforeEach((to, from, next) => {
    loadingInstance = ElLoading.service({
        fullscreen: true,
        text: '加载中... 请稍后',
    })
    // 通过 meta 字段匹配最高级路径判断是否登录，因此只需在最高级路径添加字段即可
    if (to.matched.some((recode) => recode.meta.requireAuth)) {
        let isLogin = !!localStorage.getItem('Authorization')
        if (isLogin) {
            next()
        } else {
            next({
                path: '/signin',
                replace: 'true',
            })
            message.warning('请先登录')
        }
    } else {
        next()
    }
})

router.afterEach(() => {
    loadingInstance.close()
})

export default router
