import React from 'react'

export interface LayoutPropsType {}

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
    return <div>{children}</div>
}

export default Layout
