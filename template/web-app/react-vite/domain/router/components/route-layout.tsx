import { FunctionComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { last } from 'lodash-es'
import { routeType, useMatchRoutes } from '@/domain/router'

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
