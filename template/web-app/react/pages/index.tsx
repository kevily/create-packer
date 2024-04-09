import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useRouter, routerIds } from '@/domain/router'

const View = () => {
    const location = useLocation()
    const navigate = useRouter(state => state.navigate)

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
