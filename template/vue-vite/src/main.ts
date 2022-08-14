import app from './appInstance'
import { createPinia } from 'pinia'
import router from '@/routes'
import './style.css'

app.use(createPinia()).use(router).mount('#app')
