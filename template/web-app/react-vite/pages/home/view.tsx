import { useHomeData } from '@/shared/service'

export default function Home() {
    const { data } = useHomeData()

    console.log('data', data)

    return <div className="tw:flex tw:items-center tw:justify-center">sdfs</div>
}
