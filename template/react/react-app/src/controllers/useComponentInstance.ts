import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, useEffect, useRef } from 'react'
import { componentInstance } from '@/providers'

export default function useComponentInstance<
    P extends Record<string, any>,
    Refs extends Record<string, any>
>(
    key: string,
    Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<Refs>>,
    props?: P
) {
    const $instance = useRef<(Refs & componentInstance.refsType<P>) | null>(null)
    const pending = useRef(false)

    useEffect(() => {
        if ($instance.current === null) {
            if (pending.current === false) {
                pending.current = true
                componentInstance.create(key, Component, props).then(instance => {
                    $instance.current = instance
                    props && $instance.current?.$updateProps(props)
                    pending.current = false
                })
            }
        } else {
            props && $instance.current?.$updateProps(props)
        }
    }, [props])

    return $instance
}
