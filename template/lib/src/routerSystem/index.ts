import find from './lib/find'
import update from './lib/update'

export interface routeType {
    breadcrumb?: string
    path?: string
    routes?: routesType
    [key: string]: any
}
export type routesType = routeType[]

const routerSystem = {
    find,
    update
}

export default routerSystem
