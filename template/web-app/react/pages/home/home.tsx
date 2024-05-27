import { useEffect } from 'react'
import { styled } from 'styled-components'
import { request, API } from '@/shared/service'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Home() {
    useEffect(() => {
        request.post(API.HOME_DATA).then(({ data }) => {
            console.log('data', data)
        })
    }, [])

    return <Wrapper className={'flex justify-center items-center'}>sdfs</Wrapper>
}
