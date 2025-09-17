import { createTss } from 'tss-react'
import { theme } from './theme'

export const { tss } = createTss({
    useContext: () => ({ theme })
})
