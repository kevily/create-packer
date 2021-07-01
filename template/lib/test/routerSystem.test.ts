import routerSystem, { routesType } from '../src/routerSystem'
import cloneDeep from 'lodash/cloneDeep'

const routes: routesType = [
    {
        path: '/home',
        breadcrumb: 'home',
        routes: [
            {
                path: '/home/child',
                breadcrumb: 'home/child',
                routes: [
                    {
                        path: '/home/child/child',
                        breadcrumb: 'home/child/child'
                    }
                ]
            }
        ]
    },
    {
        path: '/home2',
        breadcrumb: 'home2',
        routes: [
            {
                path: '/home2/child',
                breadcrumb: 'home2/child',
                routes: [
                    {
                        path: '/home2/child/child',
                        breadcrumb: 'home2/child/child'
                    }
                ]
            }
        ]
    }
]

test('routerSystem', () => {
    expect(routerSystem.find(routes, '/home2/child')).toEqual([routes[1], routes[1].routes[0]])
    const newRoutes = cloneDeep(routes)
    newRoutes[0].breadcrumb = 'home/update'
    newRoutes[0].newFields = 'newFields'
    expect(
        routerSystem.update(cloneDeep(routes), '/home', {
            breadcrumb: 'home/update',
            newFields: 'newFields'
        })
    ).toEqual(newRoutes)
})
