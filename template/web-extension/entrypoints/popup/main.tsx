import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContext } from '@/shared/components'
import { GlobalStyle } from '@/shared/styles'
import Popup from './popup'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <AppContext>
            <GlobalStyle />
            <Popup />
        </AppContext>
    </StrictMode>
)
