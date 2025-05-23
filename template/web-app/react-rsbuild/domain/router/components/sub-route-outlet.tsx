import { FunctionComponent } from 'react'
import { Outlet } from 'react-router'
import { useMount } from 'react-use'
import { last } from 'es-toolkit'
import { useMatchRoutes, useRouter, routeType } from '@/domain/router'

export interface propsType {
    rootId: routeType['id']
    homeId: routeType['id']
}
export const Root: FunctionComponent<propsType> = props => {
    const matchRoutes = useMatchRoutes()
    const navigate = useRouter(state => state.navigate)

    useMount(() => {
        if (last(matchRoutes)?.id === props.rootId) {
            navigate({ id: props.homeId })
        }
    })

    return <Outlet />
}
