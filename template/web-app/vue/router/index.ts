import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import names from './names'
import * as homeRouter from './home'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/pages/layout'),
        redirect: { name: names.home },
        children: [...homeRouter.routes]
    },
    { path: '/404', name: names.notFound, component: () => import('@/pages/not-found') }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach(async to => {
    if (!Object.values(names).includes(to.name as string)) {
        return {
            replace: true,
            name: names.notFound
        }
    }
})
export default router
