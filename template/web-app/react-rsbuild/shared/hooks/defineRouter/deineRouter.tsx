import { DependencyList, useEffect, useMemo } from 'react'
import { useMatches, useSearchParams, NavigateOptions, createBrowserRouter } from 'react-router'
import { assign, isArray, reduce, get, map, split, omit, cloneDeep, last, forEach } from 'lodash-es'
import { stringify, parse } from 'qs'
import { defineStore } from 'define-zustand'
import { routeByIdType, routeType, editableRouteType } from './defineRouter.types'

export default function defineRouter(router: ReturnType<typeof createBrowserRouter>) {
    const useRouter = defineStore({
        state: () => ({
            routes: cloneDeep(router.routes) as routeType[]
        }),
        getter: {
            routesById: state => {
                return (function flat(routes: routeType[], parentRoute?: routeByIdType) {
                    return reduce(
                        routes,
                        (result, { children, ...route }, i) => {
                            const $route: routeByIdType = {
                                ...route,
                                pos: parentRoute?.pos ? `${parentRoute?.pos}-${i}` : `${i}`
                            }
                            if (parentRoute) {
                                $route.path = `${
                                    parentRoute.path === '/' ? '' : parentRoute.path
                                }/${$route.path}`
                            }
                            result[$route.id] = $route
                            if (isArray(children)) {
                                assign(result, flat(children, $route))
                            }
                            return result
                        },
                        {} as Record<string, routeByIdType>
                    )
                })(state.routes)
            }
        },
        actions: (getState, action) => {
            function posToLodashPath(pos: string) {
                if (pos) {
                    return `[${split(pos, '-').join('].children[')}]`
                }
                return ''
            }

            function updateRoute(id: routeType['id'], updator: (route: editableRouteType) => void) {
                const { routesById, routes } = getState()
                const newRoutes = cloneDeep(routes)
                const path = posToLodashPath(routesById[id].pos)
                const route: routeType = get(newRoutes, path)
                const newRoute = cloneDeep(omit(route, ['element', 'errorElement', 'children']))
                updator(newRoute)
                assign(route, newRoute)
                action.setState({ routes: newRoutes })
            }
            function getRoute(id: routeType['id'], path?: string | string[]) {
                const { routesById } = getState()
                const route = routesById[id]
                if (path) {
                    return get(route, path)
                }
                return route
            }

            function genRouteUrl(id: routeType['id'], query?: Record<string, any>) {
                const path = getRoute(id, 'path')
                if (path) {
                    const { origin } = window.location
                    let url = origin + router.basename + path
                    url += query ? `?${stringify(query)}` : ''
                    return url
                }
                return void 0
            }

            function openRoute(id: routeType['id'], query?: Record<string, any>) {
                const url = genRouteUrl(id, query)
                if (url) {
                    window.open(url)
                }
            }

            function reloadRoute(id: routeType['id'], query?: Record<string, any>) {
                const url = genRouteUrl(id, query)
                if (url) {
                    window.location.replace(url)
                }
            }

            function navigate(
                to: { id: routeType['id']; query?: Record<string, any> },
                opts?: NavigateOptions
            ) {
                return router.navigate(
                    {
                        pathname: getRoute(to.id, 'path'),
                        search: to.query ? stringify(to.query) : ''
                    },
                    opts
                )
            }

            return {
                navigate,
                getRoute,
                genRouteUrl,
                openRoute,
                reloadRoute,
                updateRoute
            }
        }
    })
    function useQuery<Q>() {
        const [params] = useSearchParams()
        const query = parse(params.toString())

        return query as Q
    }

    function useMatchRoutes(): routeType[] {
        const matches = useMatches()
        const getRoute = useRouter(state => state.getRoute)
        return useMemo(() => map(matches, o => getRoute(o.id)), [matches])
    }

    /**
     * @description 验证器返回false则无权限
     */
    function useRoutePermission(
        config: {
            redirectRouteId: string
            validator: (currentRoute?: routeType) => boolean
        },
        deps: DependencyList
    ) {
        const matchRoutes = useMatchRoutes()
        const currentRoute = last(matchRoutes)
        const updateRoute = useRouter(state => state.updateRoute)
        const navigate = useRouter(state => state.navigate)
        const routesById = useRouter(state => state.routesById)

        useEffect(() => {
            forEach(routesById, route => {
                updateRoute(route.id, route => {
                    route.unauthorized = !config.validator(route)
                })
            })
        }, deps)

        useEffect(() => {
            const result = config.validator(currentRoute)
            if (!result && config.redirectRouteId) {
                navigate({ id: config.redirectRouteId }, { replace: true })
            }
        }, [currentRoute?.id, ...deps])
    }

    return { useRouter, useQuery, useMatchRoutes, useRoutePermission }
}
