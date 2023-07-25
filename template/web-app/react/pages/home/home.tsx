import './home.css'
import { useEffect } from 'react'
import { request } from '@/providers'
import { API } from './providers'

export default function Home() {
    useEffect(() => {
        request.post(API.HOME_DATA).then(({ data }) => {
            console.log('data', data)
        })
    }, [])

    return <div className={'flex justify-center items-center'}>sdfs</div>
}
