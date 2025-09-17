import { useHomeData } from '@/shared/service'
import { useStyles } from './view.css'

export default function Home() {
    const { data } = useHomeData()
    const { classes } = useStyles()

    console.log('data', data)

    return <div className={classes.root}>sdfs</div>
}
