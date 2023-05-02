import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/signin',
        component: () => import('../views/SignIn.vue'),
    },
    {
        path: '/signup',
        component: () => import('../views/SignUp.vue'),
    },
    {
        path: '/tsl',
        component: () => import('../views/translate/Index.vue'),
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
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router
