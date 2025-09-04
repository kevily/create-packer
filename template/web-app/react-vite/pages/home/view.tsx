import { useHomeData } from '@/shared/service'
import { rootCss } from './view.css'

export default function Home() {
    const { data } = useHomeData()

    console.log('data', data)

    return <div className={rootCss}>sdfs</div>
}
