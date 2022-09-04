import app from './app'
import { createPinia } from 'pinia'
import router from '@/router'
import './style.css'

app.use(createPinia()).use(router).mount('#app')
