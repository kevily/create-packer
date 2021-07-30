import React from 'react'
import ReactDOM from 'react-dom'
import Home from './index'
import { RecoilRoot } from 'recoil'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <RecoilRoot>
            <Home />
        </RecoilRoot>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})
