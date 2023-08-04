import { create, StoreApi as ZStoreApi } from 'zustand'
import { combine } from 'zustand/middleware'
import { produce } from 'immer'
import { forEach, isEqual, size } from 'lodash-es'

export type StoreApi<S> = Omit<ZStoreApi<S>, 'setState'> & {
    setState: (updater: ((state: S) => void) | Partial<S>, replace?: boolean) => void
}
export interface insideActionsType<S> {
    reset: () => void
    setState: StoreApi<S>['setState']
}
export type actionsType<S, OptionAction, InsideActions = unknown> = (
    getState: () => S,
    actions: insideActionsType<S> & InsideActions,
    store: StoreApi<S>
) => OptionAction

export type defGetterStateType<S> = Record<string, (state: S) => any>
export interface optionsType<S, G, OptionAction> {
    state: () => S
    getter: G
    actions: actionsType<S, OptionAction>
}

type ExtraGetterStateType<S, G extends defGetterStateType<S>> = {
    [key in keyof G]: ReturnType<G[key]>
}

export function define<
    S extends Record<string, any>,
    G extends defGetterStateType<S>,
    OptionActions extends Record<string, any>
>(options: optionsType<S, G, OptionActions>) {
    function createDefState() {
        const state: any = options.state()
        forEach(options.getter, (getter, k) => {
            state[k] = getter(state)
        })
        return state as S & ExtraGetterStateType<S, G>
    }
    return create(
        combine(createDefState(), (set, get, store) => {
            // getterListener
            // ----------------------------------------------------------------------
            store.subscribe((state, prevState) => {
                let equalledLen = 0
                const newGetterState: any = {}
                forEach(options.getter, (getter, k) => {
                    const value = getter(state)
                    if (isEqual(value, prevState[k])) {
                        equalledLen += 1
                    } else {
                        newGetterState[k] = getter(state)
                    }
                })
                if (size(options.getter) > equalledLen) {
                    set(newGetterState)
                }
            })
            // actions
            // ----------------------------------------------------------------------
            store.setState = (updater, replace) => {
                const nextState = typeof updater === 'function' ? produce(updater as any) : updater

                return set(nextState as any, replace)
            }
            const reset: insideActionsType<S>['reset'] = () => {
                set(() => options.state() as never)
            }
            return {
                reset,
                setState: store.setState as StoreApi<S>['setState'],
                subscribe: store.subscribe,
                ...options.actions(
                    get,
                    { reset, setState: store.setState as StoreApi<S>['setState'] },
                    store as StoreApi<S>
                )
            }
        })
    )
}
