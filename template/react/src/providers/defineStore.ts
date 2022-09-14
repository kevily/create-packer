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
                reset() {
                    setState(state => {
                        state.state = options.state()
                        return state
                    }, true)
                },
                ...(options.actions?.(setState, getState, store, $$storeMutations) || {})
            }
        })
    )
}
