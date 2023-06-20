import { create, StoreApi } from 'zustand'
import { combine } from 'zustand/middleware'
import { produce } from 'immer'
import { forEach, size } from 'lodash-es'

export interface insideActionsType<S> {
    reset: () => void
    setState: (updater: (state: S) => void) => void
}
export type actionsType<S, OptionAction, InsideActions = unknown> = (
    getState: () => S,
    actions: insideActionsType<S> & InsideActions,
    store: StoreApi<S>
) => OptionAction
export interface optionsType<S, G, OptionAction> {
    state: () => S
    getter: () => G
    actions: actionsType<S, OptionAction>
}

type GenGetterStateType<S, G extends Record<string, (state: S) => any>> = G extends Record<
    infer K,
    (state: S) => infer V
>
    ? Record<K, V>
    : unknown
export function define<
    S extends Record<string, any>,
    G extends Record<string, (state: S) => any>,
    OptionActions extends Record<string, any>
>(options: optionsType<S, G, OptionActions>) {
    function createDefState() {
        const state: any = options.state()
        forEach(options.getter(), (getter, k) => {
            state[k] = getter(state)
        })
        return state as S & GenGetterStateType<S, G>
    }
    return create(
        combine(createDefState(), (set, get, store) => {
            // getterListener
            // ----------------------------------------------------------------------
            store.subscribe(state => {
                const oldGetterState: any = get()
                let equalledLen = 0
                const newGetterState: any = {}
                forEach(options.getter(), (getter, k) => {
                    const value = getter(state)
                    if (value === oldGetterState[k]) {
                        equalledLen += 1
                    } else {
                        newGetterState[k] = getter(state)
                    }
                })
                if (size(options.getter()) > equalledLen) {
                    set(newGetterState)
                }
            })
            // actions
            // ----------------------------------------------------------------------
            const setState: insideActionsType<S>['setState'] = updater => {
                set(
                    produce((store: S) => {
                        updater(store)
                    }) as any
                )
            }
            const reset: insideActionsType<S>['reset'] = () => {
                set(() => options.state() as never)
            }
            return {
                reset,
                setState,
                subscribe: store.subscribe,
                ...options.actions(get, { reset, setState }, store)
            }
        })
    )
}
