import { useHomeData } from '@/shared/service'
import * as styles from './view.css'

export default function Home() {
    const { data } = useHomeData()

    console.log('data', data)

    return <div className={styles.root}>sdfs</div>
}
