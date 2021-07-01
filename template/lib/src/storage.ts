import isNil from 'lodash/isNil'
import isFunction from 'lodash/isFunction'
import has from 'lodash/has'

interface cacheType {
    session?: Storage
    local?: Storage
}
type storageType = keyof cacheType

const cache: cacheType = {}

class Storage {
    private storage: any
    constructor(type: storageType) {
        this.storage = type === 'local' ? window.localStorage : window.sessionStorage
    }
    public get(key: string): any {
        let newVal = this.storage.getItem(key)
        if (isNil(newVal)) {
            return newVal
        }
        try {
            newVal = JSON.parse(newVal)
        } catch (err) {}
        return newVal
    }
    public set(key: string, val: any, before?: (oldVal: any, newVal: any) => any): any {
        let newVal = val
        if (isFunction(before)) {
            const oldVal = this.get(key)
            newVal = before(oldVal, newVal)
        }
        this.storage.setItem(key, JSON.stringify(newVal))
        return newVal
    }
    public remove(key: string): any {
        const val = this.get(key)
        if (!isNil(val)) {
            this.storage.removeItem(key)
        }
        return val
    }
}

export default function (type: storageType): Storage {
    if (type !== 'session' && type !== 'local') {
        throw new Error('参数必须是session与local其中一个')
    }
    if (!has(cache, type)) {
        cache[type] = new Storage(type)
    }
    return cache[type]
}
