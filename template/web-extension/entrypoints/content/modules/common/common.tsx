import { GlobalStyle } from '@/shared/styles'
import { classNameSpace } from '@/entrypoints/content/constants'

export default function Home() {
    return (
        <>
            <GlobalStyle nameSpace={classNameSpace} />
        </>
    )
}
