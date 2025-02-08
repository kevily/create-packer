import { useAsync } from 'react-use'
import { fetchHomeData } from '@/shared/service'
import { StyledRoot } from './view.styled'

export default function Home() {
    const homeData = useAsync(fetchHomeData)

    console.log('data', homeData.value)

    return <StyledRoot>sdfs</StyledRoot>
}
