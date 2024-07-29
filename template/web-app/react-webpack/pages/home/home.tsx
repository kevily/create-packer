import { useHomeQuery } from '@/shared/service'
import { StyledRoot } from './home.styled'

export default function Home() {
    const homeQuery = useHomeQuery()

    console.log('data', homeQuery.data?.data)

    return <StyledRoot>sdsddds</StyledRoot>
}
