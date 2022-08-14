import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import routes from './routes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    {routes.map(({ path, Component }) => {
                        return <Route key={path} path={path} element={<Component />} />
                    })}
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>
)
