import React from 'react'
import { renderRoutes } from 'react-router-config'
import { LayoutPropsType } from './typings'

const Layout: React.FC<LayoutPropsType> = (props) => {
    return <div>{renderRoutes(props.route.routes)}</div>
}

export default Layout
