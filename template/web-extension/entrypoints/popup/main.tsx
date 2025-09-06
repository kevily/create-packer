import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContext } from '@/shared/components'
import Popup from './popup'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AppContext.Root>
            <Popup />
        </AppContext.Root>
    </StrictMode>
)
