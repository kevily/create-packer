import { create, StoreApi, UseBoundStore } from 'zustand'
import { combine } from 'zustand/middleware'
import { produce } from 'immer'
import { ExtractModelType } from '@/types'

export interface insideActionsType<S> {
    reset: () => void
    setState: (updater: (state: S) => void) => void
}
export type actionsType<S, OptionAction, InsideActions = unknown> = (
    getState: () => S,
    actions: insideActionsType<S> & InsideActions,
    store: StoreApi<S>
) => OptionAction
export interface optionsType<S, OptionAction> {
    state: () => S
    actions: actionsType<S, OptionAction>
}

export function define<S extends Record<string, any>, OptionActions extends Record<string, any>>(
    options: optionsType<S, OptionActions>
) {
    return create(
        combine(options.state(), (set, get, store) => {
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
                ...options.state(),
                reset,
                setState,
                subscribe: store.subscribe,
                ...options.actions(get, { reset, setState }, store)
            }
        })
    )
}

export function defineComputed<
    Model extends UseBoundStore<StoreApi<any>>,
    K extends string,
    R = any
>(useStore: Model, computed: Record<K, (state: ExtractModelType<Model>) => R>) {
    return (field: K) => useStore(computed[field])
}
