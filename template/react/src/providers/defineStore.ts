import create from 'zustand'
import { combine } from 'zustand/middleware'
import produce from 'immer'

type setStateType<S> = (updater: (state: S) => void) => void
export interface defineStoreOptionsType<S extends object, A extends object> {
    state: () => S
    actions: (
        setState: setStateType<S>,
        getState: () => S,
        getActions: () => Record<string, any>
    ) => A
}

export function defineStore<S extends object, A extends object>(
    options: defineStoreOptionsType<S, A>
) {
    return create(
        combine({ state: options.state() }, (setState, getState, store) => {
            const _setState: setStateType<S> = updater => {
                setState(
                    produce((store: { state: S }) => {
                        updater(store.state)
                    }) as any
                )
            }
            const _getState = () => getState().state
            const _getActions = () => (getState() as any).actions
            return {
                actions: {
                    reset: () => {
                        setState({ state: options.state() })
                    },
                    setState: _setState,
                    destroy: store.destroy,
                    subscribe: store.subscribe,
                    ...options.actions(_setState, _getState, _getActions)
                }
            }
        })
    )
}
