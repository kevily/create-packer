import React, { PropsWithChildren } from 'react'
import { LayoutPropsType } from './typings'

function Layout({ children }: PropsWithChildren<LayoutPropsType>) {
    return <div>{children}</div>
}

export default Layout
