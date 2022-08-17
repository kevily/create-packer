import { defineStore } from 'pinia'

export default defineStore('app', {
    state: () => {
        return {
            appName: ''
        }
    },
    actions: {
        setAppName(appName: string) {
            this.appName = appName
        }
    }
})
