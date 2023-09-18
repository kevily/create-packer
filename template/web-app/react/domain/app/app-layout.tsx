import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { navigate, routerIds } from '@/router'
import AppLoading from './app-loading'

export default function AppLayout() {
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate({ id: routerIds.home })
        }
    }, [location])

    return (
        <Suspense fallback={<AppLoading />}>
            <Outlet />
        </Suspense>
    )
}
