import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { AppLayout, AppNotFound } from '@/domain/app'
import names from './names'
import * as homeRouter from './home'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: AppLayout,
        redirect: { name: names.home },
        children: [...homeRouter.routes]
    },
    { path: '/404', name: names.notFound, component: AppNotFound }
]

export { default as routerNames } from './names'

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})
