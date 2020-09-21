import Vue from 'vue'
import VueRouter from 'vue-router'
import { RouteConfig } from 'vue-router/types/router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
