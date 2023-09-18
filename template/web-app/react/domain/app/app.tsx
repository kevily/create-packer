import { FunctionComponent, ReactNode, StrictMode, useLayoutEffect } from 'react'
import { request } from '@/providers'

const App: FunctionComponent<{ children: ReactNode }> = props => {
    useLayoutEffect(() => {
        request.interceptors.response.use(
            res => res,
            error => {
                console.log(error)
            }
        )
    }, [])

    return <StrictMode>{props.children}</StrictMode>
}

export default App
