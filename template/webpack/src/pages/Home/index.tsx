import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HomePropsType } from './typings'
import { homeSliceActions } from './Home.store'
import styles from './Home.module.css'

const App: React.FC<HomePropsType> = props => {
    const homeStore = useSelector((store: any) => store.home)
    const dispatch = useDispatch()
    console.log('homeStore', homeStore)

    return <div className={styles.home}>home</div>
}

export default App
