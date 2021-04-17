import React from 'react'
import homeStore from './home.store'
import { useRecoilValue } from 'recoil'
import './Home.css'

export interface HomePropsType {}

const App: React.FC<HomePropsType> = () => {
    const store = useRecoilValue(homeStore)

    console.log('home:store', store)
    return <div className="home">home</div>
}

export default App
