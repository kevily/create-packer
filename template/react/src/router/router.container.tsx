import { useRoutes } from 'react-router-dom'
import routerConfig from './router.config'

export default function Route() {
    return useRoutes(routerConfig)
}
