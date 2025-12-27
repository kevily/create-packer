import { useHomeData } from '@/shared/service'
import styles from './view.module.css'

export default function Home() {
    const { data } = useHomeData()

    console.log('data', data)

    return <div className={styles.root}>sdfs</div>
}
