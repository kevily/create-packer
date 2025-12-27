import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { App } from '@/domain/components'
import { router } from '@/domain/router'
import './shared/styles/theme.css'

createApp(App).use(createPinia()).use(router).mount('#app')
