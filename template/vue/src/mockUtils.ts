import path from 'node:path'
import { createDefineMock } from 'vite-plugin-mock-dev-server'

export const defineMock = createDefineMock(mock => {
    mock.url = path.join(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_HOST, mock.url)
})
