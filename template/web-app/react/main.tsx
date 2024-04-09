import { createRoot } from 'react-dom/client'
import { App } from '@/domain/app'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render((<App />) as never)
