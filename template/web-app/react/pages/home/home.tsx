import { useEffect } from 'react'
import { request, API } from '@/shared/service'
import { StyledRoot } from './home.styled'

export default function Home() {
    useEffect(() => {
        request.post(API.HOME_DATA).then(({ data }) => {
            console.log('data', data)
        })
    }, [])

    return <StyledRoot>sdfs</StyledRoot>
}
