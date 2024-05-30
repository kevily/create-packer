import { FunctionComponent, ReactNode, useEffect } from 'react'

const AppContext: FunctionComponent<{ children?: ReactNode }> = props => {
    useEffect(() => {
        document.body.setAttribute('id', 'my-app')
    }, [])
    return <>{props.children}</>
}

export default AppContext
