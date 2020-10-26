import React from 'react'
import { useSelector } from 'react-redux'
import { HomePropsType } from './typings'
import './Home.css'

const App: React.FC<HomePropsType> = () => {
    const homeStore = useSelector((store: any) => store.home)
    console.log('homeStore', homeStore)
    return <div className="home">home</div>
}

export default App
