import create from 'zustand'
import { combine } from 'zustand/middleware'
import produce from 'immer'

type setStateType<S> = (updater: (state: S) => void) => void
export interface defineStoreOptionsType<S extends object, A extends object> {
    state: () => S
    actions: (setState: setStateType<S>, getState: () => S) => A
}

export function defineStore<S extends object, A extends object>(
    options: defineStoreOptionsType<S, A>
) {
    return create(
        combine({ state: options.state() }, (setState, getState) => {
            const _setState: setStateType<S> = updater => {
                setState(
                    produce((store: { state: S }) => {
                        updater(store.state)
                    }) as any
                )
            }
            const _getState = () => getState().state

            return {
                actions: {
                    reset: () => {
                        setState({ state: options.state() })
                    },
                    setState: _setState,
                    ...options.actions(_setState, _getState)
                }
            }
        })
    )
}
