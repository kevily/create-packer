import { createPinia } from 'pinia'
import router from '@/router'
import app from './providers/app'
import './style.css'

app.use(createPinia()).use(router).mount('#app')
