import { useRef, useState, Dispatch, SetStateAction } from 'react'
import { isFunction } from 'lodash-es'

export function useSyncState<S>(initialState: S | (() => S)) {
    const [state, setState] = useState(initialState)
    const syncState = useRef<S>(state)

    const $setState: Dispatch<SetStateAction<S>> = newState => {
        const $newState = isFunction(newState) ? newState(state) : newState
        setState($newState)
        syncState.current = $newState
    }

    return [syncState, state, $setState] as const
}
