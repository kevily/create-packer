import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/renderer/domain/router'
import { App } from '@/renderer/domain/components'
import './main.css'

createApp(App).use(createPinia()).use(router).mount('#app')
