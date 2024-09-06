import { useCallback, useState, DependencyList, useRef } from 'react'

export default function useLoadingAction<C extends (...arg: any) => Promise<any> | any>(
    callback: C,
    deps: DependencyList,
    debounce = true
) {
    const [loading, setLoading] = useState(false)
    const loadingSync = useRef(loading)
    function $setLoading(loading: boolean) {
        setLoading(loading)
        loadingSync.current = loading
    }
    const action = useCallback(async (...arg: any) => {
        if (debounce && loadingSync.current) {
            return
        }
        try {
            $setLoading(true)
            return await callback(...arg)
        } finally {
            $setLoading(false)
        }
    }, deps) as C

    return [loading, action] as const
}
