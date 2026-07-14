import { createRoot } from 'react-dom/client'
import { App } from '@/components'
import './styles/theme.css'

createRoot(document.getElementById('root') as HTMLElement).render(<App.Root />)
