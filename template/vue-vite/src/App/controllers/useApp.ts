import { defineStore } from 'pinia'

export const useApp = defineStore('app', {
    state: () => {
        return {
            appName: ''
        }
    }
})
