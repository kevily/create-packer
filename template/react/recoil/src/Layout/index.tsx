import React from 'react'
import { LayoutPropsType } from './typings'
import { useRecoilValue } from 'recoil'
import appStore from '../app.store'

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
    const store = useRecoilValue(appStore)
    console.log('appStore:', store)
    return <div>{children}</div>
}

export default Layout
