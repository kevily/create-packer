import create from 'zustand'
import { combine } from 'zustand/middleware'

export default create(
    combine({}, setState => {
        return {}
    })
)
