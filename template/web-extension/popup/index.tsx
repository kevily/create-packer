import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Popup from './popup.container'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Popup />
    </StrictMode>
)
