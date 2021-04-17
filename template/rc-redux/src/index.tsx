/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'src/store'
import { renderRoutes } from 'react-router-config'
import Layout from './Layout'
import routes from './routes'
import reportWebVitals from './reportWebVitals'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Layout>
                <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
            </Layout>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
