import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/domain/router'
import { App } from '@/domain/components'
import './shared/styles/theme.css'

createApp(App).use(createPinia()).use(router).mount('#app')
