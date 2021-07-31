import React from 'react'
import ReactDOM from 'react-dom'
import Home from './index'
import { Provider } from 'react-redux'
import homeSlice from './home.store'
import { configureStore } from '@reduxjs/toolkit'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <Provider store={configureStore({ reducer: { [homeSlice.name]: homeSlice.reducer } })}>
            <Home />
        </Provider>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
