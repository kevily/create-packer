import { StrictMode, useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { request } from '@/shared/service'
import { routerInstance } from '@/domain/router'
import { theme } from '@/shared/theme'
import { GlobalStyle } from '../app.styled'

const AppComponent = () => {
    useLayoutEffect(() => {
        request.interceptors.response.use(
            res => res,
            error => {
                console.log(error)
            }
        )
    }, [])

    return (
        <>
            <GlobalStyle />
            <RouterProvider router={routerInstance} fallbackElement={<>loading...</>} />
        </>
    )
}

const AppContext = () => {
    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <AppComponent />
            </ThemeProvider>
        </StrictMode>
    )
}

export default AppContext
