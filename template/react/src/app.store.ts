import create from 'zustand'
import { combine } from 'zustand/middleware'

export const useApp = create(
    combine({}, setState => {
        return {}
    })
)
