import { createRoot } from 'react-dom/client'
import { App } from '@/domain/components'

export default function () {
    createRoot(document.getElementById('root') as HTMLElement).render(<App.Root />)
}
