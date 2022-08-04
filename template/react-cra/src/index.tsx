import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import routes from './routes'
import './index.scss'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    {routes.map(({ path, Component }) => {
                        return <Route path={path} element={<Component />} />
                    })}
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>
)

reportWebVitals()
