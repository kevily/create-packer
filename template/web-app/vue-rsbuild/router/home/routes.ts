import { RouteRecordRaw } from 'vue-router'
import names from './names'

const routes: RouteRecordRaw[] = [
    { path: '/home', name: names.home, component: () => import('@/pages/home') }
]

export default routes
