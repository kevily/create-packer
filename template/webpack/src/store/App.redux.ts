import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        APP_NAME: 'project_management',
    },
    reducers: {},
})

export const appSliceActions = appSlice.actions

export default appSlice.reducer
