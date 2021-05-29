/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Layout from './Layout'
import routes from './routes'
import { RecoilRoot } from 'recoil'
import './index.scss'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <Layout>{renderRoutes(routes)} </Layout>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
