import { configureStore } from '@reduxjs/toolkit'

// @ts-ignore
const ctx = require.context('../', true, /\.store\.(js|ts)$/)
const reducer: any = {}
ctx.keys().forEach((path: string) => {
    const store: any = ctx(path).default
    reducer[store.name] = store.reducer
})

export default configureStore({ reducer })
