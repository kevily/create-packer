import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { App } from '@/domain/app'
import { router } from '@/router'
import './index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
    <App>
        <RouterProvider router={router} />
    </App>
)
