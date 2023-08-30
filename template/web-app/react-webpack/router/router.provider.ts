import { get } from 'lodash-es'
import { stringify } from 'qs'
import { NavigateOptions } from 'react-router-dom'
import { routeType } from '@/router/router.types'
import { router, routesById } from './router'

export function getRoute(id: routeType['id'], path?: string | string[]) {
    const route = routesById[id]
    if (path) {
        return get(route, path)
    }
    return route
}

export function genRouteUrl(id: routeType['id'], query?: Record<string, any>) {
    const path = getRoute(id, 'path')
    if (path) {
        const { origin } = window.location
        let url = origin + BASE_URL + path
        url += query ? `?${stringify(query)}` : ''
        return url
    }
    return void 0
}

export function openRoute(id: routeType['id'], query?: Record<string, any>) {
    const url = genRouteUrl(id, query)
    if (url) {
        window.open(url)
    }
}

export function navigate(
    to: { id: routeType['id']; query?: Record<string, any> },
    opts?: NavigateOptions
) {
    return router.navigate(
        { pathname: getRoute(to.id, 'path'), search: to.query ? stringify(to.query) : '' },
        opts
    )
}
