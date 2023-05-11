import { Router, useRoutes } from '@solidjs/router'
import { routes } from '@/router'

export default function App() {
    const Routes = useRoutes(routes)

    return (
        <Router>
            <Routes />
        </Router>
    )
}
