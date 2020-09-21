import React from 'react'
import ReactDOM from 'react-dom'
import routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import store from '@/store'

import './global.scss'

function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
            </Provider>
        </React.StrictMode>
    )
}

ReactDOM.render(<App />, document.getElementById('main'))
