import {
    forwardRef,
    ForwardRefExoticComponent,
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

export async function create<P extends Record<string, any>, Refs extends Record<string, any>>(
    key: string,
    Component: ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<Refs>>,
    props?: P
) {
    let current = instanceMap[key]
    if (current) {
        await current.pending
        return current.instance
    }
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
        return <Component ref={ref} {...(state as any)} />
    })
    current = instanceMap[key] = {
        instance: void 0,
        pending: new Promise<void>(resolve => {
            createRoot(div).render(
                <ApiComponent
                    ref={instance => {
                        current.instance = instance!
                        instanceMap[key].instance = instance
                        resolve()
                    }}
                />
            )
        })
    }
    await instanceMap[key].pending
    props && current.instance.$setProps(props)
    return current.instance
}
