import { useHomeData } from '@/renderer/service'

export default function Home() {
    const { data } = useHomeData()

    console.log('data', data)

    return <div className="tw:flex">sdfs</div>
}
