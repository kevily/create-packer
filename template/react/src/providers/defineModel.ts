import { create, StoreApi, UseBoundStore } from 'zustand'
import { produce } from 'immer'
import { ExtractModelType } from '@/types'

export interface modelActionsType<S> {
    reset: () => void
    setState: (updater: (state: S) => void) => void
}
export type genModelActionsType<S, A> = (
    set: modelActionsType<S>['setState'],
    get: () => S & modelActionsType<S>,
    store: StoreApi<S>
) => A
export interface modelOptionsType<S, A> {
    state: () => S
    actions: genModelActionsType<S, A>
}

export function defineModel<S extends Record<string, any>, A extends Record<string, any>>(
    options: modelOptionsType<S, A>
) {
    return create<S & modelActionsType<S> & A>()((set, get, store) => {
        const setState: modelActionsType<S>['setState'] = updater => {
            set(
                produce((store: S) => {
                    updater(store)
                }) as any
            )
        }
        const reset: modelActionsType<S>['reset'] = () => {
            set(() => options.state() as never)
        }
        return {
            ...options.state(),
            reset,
            setState,
            subscribe: store.subscribe,
            ...options.actions(setState, get, store)
        }
    })
}

export function defineModelComputed<
    Model extends UseBoundStore<StoreApi<any>>,
    K extends string,
    R = any
>(useStore: Model, computed: Record<K, (state: ExtractModelType<Model>) => R>) {
    return (field: K) => useStore(computed[field])
}
