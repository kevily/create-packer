import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Content from './modules/content/content'
import { AppContext } from './components'

const app = document.createElement('div')
createRoot(app).render(
    <StrictMode>
        <AppContext.Root>
            <Content />
        </AppContext.Root>
    </StrictMode>
)

document.body.appendChild(app)
