import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import names from './names'
import * as homeRouter from './home'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/domain/app/app-layout.vue'),
        redirect: { name: names.home },
        children: [...homeRouter.routes]
    },
    {
        path: '/404',
        name: names.notFound,
        component: () => import('@/domain/app/app-not-found.vue')
    }
]

export { default as routerNames } from './names'

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
