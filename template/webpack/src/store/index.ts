import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        app: require('./App.redux').default,
        home: require('../pages/Home/redux').default,
    },
})
