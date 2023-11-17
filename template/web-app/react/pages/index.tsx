import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { navigate, routerIds } from 'router'

const View = () => {
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate({ id: routerIds.home })
        }
    }, [location])

    return (
        <Suspense fallback={<>loading...</>}>
            <Outlet />
        </Suspense>
    )
}

export default View
