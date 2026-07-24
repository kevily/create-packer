import { createRoot } from 'react-dom/client'
import { App } from '@/renderer/components'
import './styles/theme.css'

createRoot(document.getElementById('root') as HTMLElement).render(<App.Root />)
