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

    useEffect(() => {
        componentInstance.create(key, Component, props).then(instance => {
            $instance.current = instance
        })
    }, [])

    return $instance
}
