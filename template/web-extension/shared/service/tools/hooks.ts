import { Hooks } from 'ky'
import { omit } from 'lodash-es'
import { stringify, parse } from 'qs'
import { ArrayValues } from '1k-types'
import { serviceHooksType } from '../types'
import { pickRequestBody } from './base'

export function createServiceHooks(hooks?: Partial<serviceHooksType>) {
    const serviceHooks: serviceHooksType = {
        httpError: [],
        beforeRequest: [],
        afterResponse: [],
        ...(hooks || {})
    }

    function addHooks<K extends keyof serviceHooksType>(
        key: K,
        callback: ArrayValues<serviceHooksType[K]>
    ) {
        serviceHooks[key].push(callback as any)
    }

    return {
        serviceHooks,
        addHooks
    }
}

export function createKyRequestHooks(serviceHooks: serviceHooksType): Hooks {
    async function forEachHooks<K extends keyof serviceHooksType>(
        name: K,
        arg: Parameters<ArrayValues<serviceHooksType[K]>>[0]
    ) {
        for (let i = 0; i < serviceHooks[name].length; i++) {
            const fn = serviceHooks[name][i]
            await fn(arg as never)
        }
    }
    return {
        beforeRequest: [
            async req => {
                // eslint-disable-next-line prefer-const
                let [url, searchParams] = req.url.split('?')
                const reqBody = await pickRequestBody(req)
                const parsedSearchParams = parse(searchParams)
                const reqConfig = {
                    searchParams: parsedSearchParams,
                    body: reqBody,
                    headers: req.headers,
                    method: req.method
                }
                await forEachHooks('beforeRequest', reqConfig)
                url = url + stringify(reqConfig.searchParams, { addQueryPrefix: true })
                return new Request(url, {
                    ...omit(req, 'url'),
                    headers: reqConfig.headers,
                    body: reqBody ? JSON.stringify(reqConfig.body) : void 0
                })
            }
        ],
        afterResponse: [
            async (request, options, response) => {
                await forEachHooks('afterResponse', { request, options, response })
            }
        ]
    }
}
