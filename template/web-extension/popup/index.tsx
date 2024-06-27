import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContext } from '@/shared/components'
import { GlobalStyle } from '@/shared/theme'
import Popup from './popup.container'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AppContext>
            <GlobalStyle />
            <Popup />
        </AppContext>
    </StrictMode>
)
