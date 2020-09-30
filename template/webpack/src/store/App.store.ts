import { createSlice } from '@reduxjs/toolkit'

export const name = 'app'
export const appSlice = createSlice({
    name,
    initialState: {
        APP_NAME: 'project_management'
    },
    reducers: {}
})

export const appSliceActions = appSlice.actions

export default appSlice.reducer
