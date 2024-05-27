import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContext } from '@/domain/app'
import Content from './content'

const app = document.createElement('div')
createRoot(app).render(
    <StrictMode>
        <AppContext.Root>
            <Content />
        </AppContext.Root>
    </StrictMode>
)

document.body.appendChild(app)
