import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, useEffect, useRef } from 'react'
import { componentInstance } from '@/providers'

export default function useComponentInstance<
    P extends Record<string, any>,
    Refs extends Record<string, any>
>(
    key: string,
    Component: ForwardRefExoticComponent<PropsWithoutRef<any> & RefAttributes<Refs>>,
    props?: P
) {
    const $instance = useRef<(Refs & componentInstance.refsType<P>) | null>(null)
    const pending = useRef(false)

    useEffect(() => {
        if (pending.current === false) {
            pending.current = true
            componentInstance.create(key, Component, props).then(instance => {
                $instance.current = instance
            })
        } else {
            $instance.current?.$updateProps(props)
        }
    }, [props])

    return $instance
}
