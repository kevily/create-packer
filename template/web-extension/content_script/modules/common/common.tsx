import { GlobalStyle } from '@/shared/styles'
import { classNameSpace } from '@/content_script/constants'

export default function Home() {
    return (
        <>
            <GlobalStyle nameSpace={classNameSpace} />
        </>
    )
}
