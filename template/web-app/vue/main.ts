import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { router } from '@/router'
import { app } from '@/domain/app'
import './style.css'

app.use(VueQueryPlugin).use(createPinia()).use(router).mount('#app')
