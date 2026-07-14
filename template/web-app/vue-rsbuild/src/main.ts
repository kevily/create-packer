import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import { App } from '@/components'
import './styles/theme.css'

createApp(App).use(createPinia()).use(router).mount('#app')
