import { RefObject, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'
import { useSyncState } from './useSyncState'

interface optionsType extends IntersectionObserverInit {
    dynamicRender?: boolean
    isClose?: boolean
}
export function useLazyRender(ref: RefObject<HTMLElement>, options: optionsType) {
    const emptyRef = useRef(null)
    const intersection = useIntersection(options.isClose ? emptyRef : ref, {
        root: options.root,
        rootMargin: options.rootMargin,
        threshold: options.threshold
    })
    const [isRenderRef, isRender, setIsRender] = useSyncState(false)

    useEffect(() => {
        if (options.isClose) {
            setIsRender(true)
            return
        }
        if (!options.dynamicRender && isRenderRef.current) {
            return
        }
        setIsRender(!!intersection?.isIntersecting)
    }, [intersection?.isIntersecting, options.isClose, options.dynamicRender])

    return isRender
}
