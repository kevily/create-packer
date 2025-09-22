import { useHomeData } from '@/shared/service'
import { StyledRoot } from './view.styled'

export default function Home() {
    const { data } = useHomeData()

    console.log('data', data)

    return <StyledRoot>sdfs</StyledRoot>
}
