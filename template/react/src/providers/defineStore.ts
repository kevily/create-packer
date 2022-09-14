import create from 'zustand'
import { combine } from 'zustand/middleware'

type setStateType<S> = (updater: (state: S) => void) => void
type actionsType<S, A> = {
    reset: () => void
    setState: setStateType<S>
} & A
export interface defineStoreOptionsType<S extends object, A extends object> {
    state: () => S
    actions?: (setState: setStateType<S>, getState: () => S) => A
}
export function defineStore<S extends object, A extends object>(
    options: defineStoreOptionsType<S, A>
) {
    return create(
        combine({ state: options.state() }, (setState, getState) => {
            const _setState: setStateType<S> = updater => {
                setState(store => {
                    updater(store.state)
                    return { state: store.state }
                })
            }
            const _getState = () => getState().state
            return {
                reset: () => {
                    setState({ state: options.state() })
                },
                setState: _setState,
                ...(options.actions?.(_setState, _getState) || {})
            } as actionsType<S, A>
        })
    )
}
