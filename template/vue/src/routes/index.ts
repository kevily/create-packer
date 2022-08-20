import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import names from './names'
import Home from '@/pages/Home'

const routes: (RouteRecordRaw & { name: string })[] = [
    { path: '/', name: names.home, component: Home },
    { path: '/404', name: names.notFound, component: () => import('@/pages/notFound') }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach(async to => {
    if (!Object.values(names).includes(to.name! as string)) {
        return {
            replace: true,
            name: names.notFound
        }
    }
})
export default router
