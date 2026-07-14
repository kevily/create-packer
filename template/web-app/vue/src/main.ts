import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { App } from '@/components'
import { router } from '@/router'
import './main.css'

createApp(App).use(createPinia()).use(router).mount('#app')
