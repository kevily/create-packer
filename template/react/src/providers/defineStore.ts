import { StateCreator } from 'zustand/vanilla'
import create from 'zustand'
import { combine } from 'zustand/middleware'

export interface defineStoreOptionsType<S extends object, A extends object> {
    state: () => S
    actions?: StateCreator<{ state: S }, [], [], A>
}
export function defineStore<S extends object, U extends object>(
    options: defineStoreOptionsType<S, U>
) {
    return create(
        combine({ state: options.state() }, (setState, getState, store, $$storeMutations) => {
            return {
                reset: () => {
                    setState({ state: options.state() })
                },
                updater: (updater: (state: S) => void) => {
                    setState(store => {
                        updater(store.state)
                        return { state: store.state }
                    })
                },
                ...(options.actions?.(setState, getState, store, $$storeMutations) || {})
            }
        })
    )
}
