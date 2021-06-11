import React from 'react'
import { useSelector } from 'react-redux'
import './Home.scss'

export interface HomePropsType {}

const App: React.FC<HomePropsType> = () => {
    const homeStore = useSelector((store: any) => store.home)
    return <div className="home">home</div>
}

export default App
