import { createRoot } from 'react-dom/client'
import { App } from '@/domain/app'

createRoot(document.getElementById('root') as HTMLElement).render(<App.Root />)
