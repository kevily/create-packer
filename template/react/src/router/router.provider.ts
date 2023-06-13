import { find, get } from 'lodash-es'
import { stringify } from 'qs'
import { NavigateOptions, redirect as routerRedirect } from 'react-router-dom'
import { router, routesList } from './router'

export function getRoute(name: string, path?: string | string[]) {
    const route = find(routesList, o => o.name === name)
    if (path) {
        return get(route, path)
    }
    return route
}

export function navigate(
    to: { name: string; query?: Record<string, any> },
    opts?: NavigateOptions
) {
    return router.navigate(
        { pathname: getRoute(to.name, 'path'), search: to.query ? stringify(to.query) : '' },
        opts
    )
}
