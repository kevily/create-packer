import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContext } from '@/domain/app'
import Popup from './popup.container'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AppContext>
            <Popup />
        </AppContext>
    </StrictMode>
)
