import { useEffect, useState } from 'react'
import { useInterval as useRUInterval } from 'react-use'

interface actionsType {
    start: () => void
    stop: () => void
}
export default function useInterval(
    cb: (actions: actionsType) => Promise<void> | void,
    delay: number
): actionsType {
    const [startInterval, setStartInterval] = useState(false)
    const start: actionsType['start'] = () => {
        setStartInterval(true)
    }
    const stop: actionsType['stop'] = () => {
        setStartInterval(false)
    }
    useRUInterval(
        async () => {
            cb({ start, stop })
        },
        startInterval ? delay : null
    )
    return { start, stop }
}
