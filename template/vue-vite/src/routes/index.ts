import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home'
import CannotAccess from '@/pages/404'
import routeNames from './routeNames'

const routes: (RouteRecordRaw & { name: string })[] = [
    { path: '/', name: routeNames.home, component: Home },
    { path: '/404', name: routeNames.cannotAccess, component: CannotAccess }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach(async to => {
    if (!Object.values(routeNames).includes(to.name! as string)) {
        return {
            replace: true,
            name: routeNames.cannotAccess
        }
    }
})
export default router
