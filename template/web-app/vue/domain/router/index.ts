import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import names from './names'
import * as homeRouter from './home'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/pages'),
        redirect: { name: names.home },
        children: [
            ...homeRouter.routes,
            {
                path: '/404',
                name: names.notFound,
                component: () => import('@/pages/not-found.vue')
            }
        ]
    }
]

export { default as routerNames } from './names'

export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes
})
