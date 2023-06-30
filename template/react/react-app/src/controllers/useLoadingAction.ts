import { useCallback, useState, DependencyList } from 'react'

export default function useLoadingAction<C extends (...arg: any) => Promise<any> | any>(
    callback: C,
    deps: DependencyList
): [boolean, C] {
    const [loading, setLoading] = useState(false)
    const action = useCallback(async (...arg: any) => {
        try {
            setLoading(true)
            return await callback(...arg)
        } finally {
            setLoading(false)
        }
    }, deps)

    return [loading, action as C]
}
