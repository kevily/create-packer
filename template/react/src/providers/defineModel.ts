import { create } from 'zustand'
import { produce } from 'immer'

export type setStateType<S> = (updater: (state: S) => void) => void
export interface modelActionsType<S extends Record<string, any>> {
    reset: () => void
    setState: setStateType<S>
}
export interface modelOptionsType<S extends Record<string, any>, A extends Record<string, any>> {
    state: () => S
    actions: (getState: () => S, actions: modelActionsType<S>) => A
}

export function defineModel<S extends Record<string, any>, A extends Record<string, any>>(
    options: modelOptionsType<S, A>
) {
    return create<{ state: S; actions: modelActionsType<S> & A }>()((setState, getState, store) => {
        const _setState: modelActionsType<S>['setState'] = updater => {
            setState(
                produce((store: { state: S }) => {
                    updater(store.state)
                }) as any
            )
        }
        const _getState = () => getState().state
        const reset: modelActionsType<S>['reset'] = () => {
            setState({ state: options.state() })
        }
        return {
            state: options.state(),
            actions: {
                reset,
                setState: _setState,
                subscribe: store.subscribe,
                ...options.actions(_getState, {
                    reset,
                    setState: _setState
                })
            }
        }
    })
}
