import {
    forwardRef,
    ForwardRefExoticComponent,
    FunctionComponent,
    PropsWithChildren,
    PropsWithoutRef,
    RefAttributes,
    useImperativeHandle,
    useRef,
    useState
} from 'react'
import { createRoot } from 'react-dom/client'

const instanceMap: Record<string, { pending: Promise<any>; instance: any }> = {}

export interface refsType<P> {
    $setProps: (newProps: P) => void
    $updateProps: (newProps: Partial<P>) => void
}

export function create(Context?: FunctionComponent<PropsWithChildren<any>>) {
    return async function <P extends Record<string, any>, Refs extends Record<string, any>>(
        key: string,
        Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<Refs>>,
        props?: P
    ) {
        let current = instanceMap[key]
        if (!current) {
            const div = document.createElement('div')
            document.body.appendChild(div)
            const ApiComponent = forwardRef<Refs & refsType<P>>((__, refs) => {
                const ref = useRef<Refs>(null)
                const [state, setState] = useState<Partial<P>>(props || {})

                useImperativeHandle(refs, () => {
                    return {
                        $setProps: newProps => {
                            setState(() => newProps)
                        },
                        $updateProps: newProps => {
                            if (newProps) {
                                setState(state => ({ ...state, ...newProps }))
                            }
                        },
                        ...ref.current
                    } as Refs & refsType<P>
                })
                if (Context) {
                    return (
                        <Context>
                            <Component ref={ref} {...(state as any)} />
                        </Context>
                    )
                }
                return <Component ref={ref} {...(state as any)} />
            })
            current = instanceMap[key] = {
                instance: void 0,
                pending: new Promise<void>(resolve => {
                    createRoot(div).render(
                        (
                            <ApiComponent
                                ref={instance => {
                                    current.instance = instanceMap[key].instance = instance!
                                    resolve()
                                }}
                            />
                        ) as never
                    )
                })
            }
        }
        await current.pending
        current.instance.$setProps(props)
        // Delay return to avoid sync issue
        // ------------------------------------------------------------------------
        await new Promise(resolve => setTimeout(resolve))
        return current.instance as Refs & refsType<P>
    }
}
