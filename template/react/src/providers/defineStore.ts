import { create } from 'zustand'
import { produce } from 'immer'

export type setStateType<S> = (updater: (state: S) => void) => void
export interface modelActionsType {
    reset: () => void
}
export interface modelOptionsType<S extends Record<string, any>, A extends Record<string, any>> {
    state: () => S
    actions: (setState: setStateType<S>, getState: () => S, actions: modelActionsType) => A
}

export function defineModel<
    S extends Record<string, any>,
    A extends Record<string, any> = Record<string, any>
>(options: modelOptionsType<S, A>) {
    return create<{ state: S; actions: A }>()((setState, getState, store) => {
        const _setState: setStateType<S> = updater => {
            setState(
                produce((store: { state: S }) => {
                    updater(store.state)
                }) as any
            )
        }
        const _getState = () => getState().state
        const reset: modelActionsType['reset'] = () => {
            setState({ state: options.state() })
        }
        return {
            state: options.state(),
            actions: {
                reset,
                setState: _setState,
                subscribe: store.subscribe,
                ...options.actions(_setState, _getState, { reset })
            }
        }
    })
}
