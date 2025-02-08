import { createPinia } from 'pinia'
import { router } from '@/router'
import { app } from '@/domain/app'
import './style.css'

app.use(createPinia()).use(router).mount('#app')
