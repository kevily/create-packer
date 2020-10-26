import React from 'react'
import { LayoutPropsType } from './typings'

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
    return <div>{children}</div>
}

export default Layout
