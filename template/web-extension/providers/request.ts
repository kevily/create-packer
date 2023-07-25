import { isFunction, size } from 'lodash-es'
import { stringify } from 'qs'

type fetchConfigType = Required<Parameters<typeof fetch>>[1]

interface configType {
    baseURL: string
    headers?: {
        'Content-Type'?: string
        [key: string]: string | undefined
    }
    onError?: (e: Error) => void
}

const DEFAULT_CONFIG: Partial<configType> = {
    headers: {
        'Content-Type': 'application/json'
    }
}

class Request {
    baseURL: configType['baseURL']
    constructor(config: configType) {
        this.baseURL = config.baseURL
    }
    async request(url: string, config?: fetchConfigType) {
        try {
            const response = await fetch(this.baseURL + url, {
                headers: DEFAULT_CONFIG.headers as never,
                ...config
            })
            if (response.status !== 200) {
                const errMsg = `服务器错误状态：${response.status}`
                throw new Error(errMsg)
            }
            return await response.json()
        } catch (error: any) {
            if (isFunction(DEFAULT_CONFIG.onError)) {
                DEFAULT_CONFIG.onError(error)
            }
            throw new Error(error.message)
        }
    }
    get(url: string, data?: Record<string, any> | any[]) {
        const query = size(data) > 0 ? `?${stringify(data)}` : ''
        return this.request(url + query, {
            method: 'GET'
        })
    }
    post(url: string, body?: any) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    }
}

export const request = new Request({
    baseURL: import.meta.env.VITE_API_HOST
})
