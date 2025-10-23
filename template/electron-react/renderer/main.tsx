import { createRoot } from 'react-dom/client'
import { App } from '@/renderer/domain/components'

createRoot(document.getElementById('root') as HTMLElement).render(<App.Root />)
