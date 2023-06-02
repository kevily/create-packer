import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Content from './content.container'

const app = document.createElement('div')
createRoot(app).render(
    <StrictMode>
        <Content />
    </StrictMode>
)

document.body.appendChild(app)
