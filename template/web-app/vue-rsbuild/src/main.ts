import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import { App } from '@/components'
import './main.css'

createApp(App).use(createPinia()).use(router).mount('#app')
