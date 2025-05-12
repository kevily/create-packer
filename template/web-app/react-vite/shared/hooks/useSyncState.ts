import { useRef, useState, Dispatch, SetStateAction } from 'react'
import { isFunction } from 'es-toolkit'

export function useSyncState<S>(initialState: S | (() => S)) {
    const [state, setState] = useState(initialState)
    const syncState = useRef<S>(state)

    const $setState: Dispatch<SetStateAction<S>> = newState => {
        const $newState = (isFunction(newState) ? newState(state) : newState) as S
        setState($newState)
        syncState.current = $newState
    }

    return [syncState, state, $setState] as const
}
