import { createPinia } from 'pinia'
import { router } from '@/renderer/domain/router'
import { app } from '@/renderer/domain/app'
import './main.css'

app.use(createPinia()).use(router).mount('#app')
