import {
    forwardRef,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react'
import { createRoot } from 'react-dom/client'

const instanceMap: Record<string, any> = {}

interface refsType<P> {
    setProps: (newProps?: P) => void
    updateProps: (newProps?: Partial<P>) => void
}

export async function create<P extends Record<string, any>, Refs extends Record<string, any>>(
    key: string,
    Component: ForwardRefExoticComponent<PropsWithoutRef<any> & RefAttributes<Refs>>,
    props?: P
) {
    let $instance: Refs & refsType<P> = instanceMap[key]

    if (!$instance) {
        const div = document.createElement('div')
        document.body.appendChild(div)
        const ApiComponent = forwardRef<Refs & refsType<P>>((__, refs) => {
            const ref = useRef<Refs>(null)
            const [state, setState] = useState<P | Record<string, any>>(props || {})

            useImperativeHandle(refs, () => {
                return {
                    setProps: newProps => {
                        setState(() => newProps)
                    },
                    updateProps: newProps => {
                        if (newProps) {
                            setState(state => ({ ...state, ...props }))
                        }
                    },
                    ...ref.current
                } as Refs & refsType<P>
            })
            return <Component ref={ref} {...state} />
        })
        await new Promise<void>(resolve => {
            createRoot(div).render(
                <ApiComponent
                    ref={instance => {
                        $instance = instance!
                        resolve()
                    }}
                />
            )
        })
    }
    $instance.setProps(props)
    return $instance
}

export function useHooks<P extends Record<string, any>, Refs extends Record<string, any>>(
    key: string,
    Component: ForwardRefExoticComponent<PropsWithoutRef<any> & RefAttributes<Refs>>,
    props?: P
) {
    const $instance = useRef<Refs & refsType<P>>(instanceMap[key])

    useEffect(() => {
        create(key, Component, props).then(instance => {
            $instance.current = instance
        })
    }, [])

    return $instance
}
