import { routeType, routesType } from '../index'
import find from './find'
import assign from 'lodash/assign'
import isArray from 'lodash/isArray'
import last from 'lodash/last'

export default function update(routes: routesType, pathname: string, value: routeType): routesType {
    if (isArray(routes) && pathname && value) {
        const target = last(find(routes, pathname))
        assign(target, value)
    }
    return routes
}
