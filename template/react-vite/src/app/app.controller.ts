import { useEffect } from 'react'

export function useInit() {
    useEffect(() => {
        console.log('init')
    }, [])
}
