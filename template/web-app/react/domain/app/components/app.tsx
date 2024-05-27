import { StrictMode, useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/shared/theme'
import { request } from '@/shared/service'
import { routerInstance } from '@/domain/router'

const App = () => {
    useLayoutEffect(() => {
        request.interceptors.response.use(
            res => res,
            error => {
                console.log(error)
            }
        )
    }, [])

    return (
        <StrictMode>
            <ThemeProvider>
                <RouterProvider router={routerInstance} />
            </ThemeProvider>
        </StrictMode>
    )
}

export default App
