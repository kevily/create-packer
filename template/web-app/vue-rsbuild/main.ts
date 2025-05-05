import { createPinia } from 'pinia'
import { router } from '@/domain/router'
import { app } from '@/domain/app'
import './main.css'

app.use(createPinia()).use(router).mount('#app')
