import { FunctionComponent, ReactNode } from 'react'

const AppContext: FunctionComponent<{ children?: ReactNode }> = props => {
    return <div id={'app'}>{props.children}</div>
}

export default AppContext
