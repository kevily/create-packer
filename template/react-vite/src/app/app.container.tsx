import { PropsWithChildren } from 'react'

export interface AppPropsType {}
function App({ children }: PropsWithChildren<AppPropsType>) {
    return <div>{children}</div>
}

export default App
