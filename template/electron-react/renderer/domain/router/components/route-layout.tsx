import { FunctionComponent } from 'react'
import { Outlet } from 'react-router'
import { last } from 'es-toolkit'
import { routeType, useMatchRoutes } from '@/renderer/domain/router'

export interface propsType {
    Index: FunctionComponent
    rootId: routeType['id']
}

export const Root: FunctionComponent<propsType> = ({ Index, rootId }) => {
    const matchRoutes = useMatchRoutes()

    if (last(matchRoutes)?.id === rootId) {
        return <Index />
    }

    return <Outlet />
}
