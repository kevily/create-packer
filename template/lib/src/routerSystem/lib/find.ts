import { routeType, routesType } from '../index'
import isArray from 'lodash/isArray'
import size from 'lodash/size'
import startsWith from 'lodash/startsWith'

export default function find(routes: routesType, pathname: string): routesType {
    const result: routesType = []
    let target: routeType = {}
    let i = 0
    while (true) {
        target = routes[i]
        if (!target || pathname === target.path) {
            result.push(target)
            break
        }
        // find parent
        // ----------------------------------------------------------------------
        if (startsWith(pathname, `${target.path}/`)) {
            if (isArray(target.routes)) {
                routes = target.routes
                i = 0
                result.push(target)
                continue
            } else {
                break
            }
        }
        i += 1
        if (size(routes) <= i) {
            break
        }
    }
    return result
}
