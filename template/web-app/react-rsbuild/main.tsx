import { createRoot } from 'react-dom/client'
import { App } from '@/domain/components'
import './shared/styles/theme.css'

createRoot(document.getElementById('root') as HTMLElement).render(<App.Root />)
