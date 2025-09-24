import { useEffect, useState, useTransition, DependencyList } from 'react'

/**
 *
 * @param callback
 * @param watches If set, it is autorun callback
 * @returns
 */
export default function useLowPriorityState<V>(callback: () => V, watches?: DependencyList) {
    const [value, setValue] = useState<V>(callback)
    const [loading, startTransition] = useTransition()

    function startLoad() {
        startTransition(() => {
            setValue(callback())
        })
    }

    useEffect(() => {
        if (watches) {
            startLoad()
        }
    }, watches)

    return [value, { loading, startLoad }] as const
}
