import './home.css'
import { useEffect } from 'react'
import { request, API } from '@/shared/service'

export default function Home() {
    useEffect(() => {
        request.post(API.HOME_DATA).then(({ data }) => {
            console.log('data', data)
        })
    }, [])

    return <div className={'flex justify-center items-center'}>sdfs</div>
}
