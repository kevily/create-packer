import { Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { navigate, routerIds } from '@/router'
import { Loading } from './components'

export default function Layout() {
    const location = useLocation()

    useLayoutEffect(() => {
        if (location.pathname === '/') {
            navigate({ id: routerIds.home })
        }
    }, [location])

    return (
        <Suspense fallback={<Loading />}>
            <Outlet />
        </Suspense>
    )
}
