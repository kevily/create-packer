import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { useRouter, routerIds } from '@/domain/router'

const Layout = () => {
    const location = useLocation()
    const navigate = useRouter(state => state.navigate)

    useEffect(() => {
        if (location.pathname === '/') {
            navigate({ id: routerIds.home })
        }
    }, [location])

    return <Outlet />
}

export default Layout
