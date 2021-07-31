import { createSlice } from '@reduxjs/toolkit'

export const name = 'home'
export const appSlice = createSlice({
    name,
    initialState: {},
    reducers: {}
})

export const homeSliceActions = appSlice.actions

export default appSlice.reducer
