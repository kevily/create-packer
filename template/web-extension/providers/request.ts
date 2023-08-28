import { noop, size } from 'lodash-es'
import { stringify } from 'qs'

type fetchConfigType = Required<Parameters<typeof fetch>>[1]

interface configType {
    baseURL: string
    headers?: {
        'Content-Type'?: string
        [key: string]: string | undefined
    }
    onError?: (e: Response) => void
}

async function resFormatter(response: Response) {
    const contentType = response.headers.get('Content-Type')

    if (contentType?.startsWith('application/json')) {
        return await response.json()
    }

    if (contentType?.startsWith('text/html')) {
        return await response.text()
    }

    return response
}

class Request {
    config: configType
    constructor(config: configType) {
        this.config = {
            onError: noop,
            ...config,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers
            }
        }
    }
    async request(url: string, config?: fetchConfigType) {
        try {
            const response = await fetch(this.config.baseURL + url, {
                headers: this.config.headers as never,
                ...config
            })
            if (response.status !== 200) {
                const errMsg = `服务器错误状态：${response.status}`
                this.config.onError?.(response)
                throw new Error(errMsg)
            }
            return resFormatter(response)
        } catch (error: any) {
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

export function create(config: configType) {
    return new Request(config)
}
