import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/renderer/router'
import { App } from '@/renderer/components'
import './main.css'

createApp(App).use(createPinia()).use(router).mount('#app')
