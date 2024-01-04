import { createService } from './tools'

export const request = createService({
    prefixUrl: import.meta.env.VITE_API_HOST
})
