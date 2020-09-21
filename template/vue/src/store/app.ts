import { StoreOptions } from 'vuex/types'

const state = {}
type appStoreType = StoreOptions<typeof state>

const store: appStoreType = {
    state,
    mutations: {
        updater() {
            const a = {
                b: 2
            }
            console.log('1', a?.b)
        }
    },
    actions: {}
}

export default store
