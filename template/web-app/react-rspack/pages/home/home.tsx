import { useHomeQuery } from '@/shared/service'
import { StyledRoot } from './home.styled'

export default function Home() {
    const query = useHomeQuery()

    console.log('data', query.data)

    return <StyledRoot>sdfs</StyledRoot>
}
