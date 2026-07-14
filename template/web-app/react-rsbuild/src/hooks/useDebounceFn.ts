import { useCallback, DependencyList, useState } from 'react'
import { useSyncState } from './useSyncState'

interface optionsType {
    /**
     * @description 开启后会等待loading结束才可以继续执行
     * @default true
     */
    debounce?: boolean
}

export function useDebounceFn<C extends (...arg: any) => Promise<any>>(
    callback: C | undefined,
    deps: DependencyList,
    options?: optionsType
) {
    const [loadingSync, loading, setLoading] = useSyncState(false)
    const [error, setError] = useState<Error | null>(null)
    const debounce = options?.debounce ?? true

    const handle = useCallback(async (...arg: any) => {
        if (debounce && loadingSync.current) {
            return
        }
        try {
            setLoading(true)
            setError(null)
            return await callback?.(...arg)
        } catch (e: any) {
            setError(e)
        } finally {
            setLoading(false)
        }
    }, deps) as C

    return [handle, { loading, error }] as const
}
