import { Hooks } from 'ky'
import { omit } from 'lodash-es'
import { parse, stringify } from 'qs'
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
    const kyHooks: Hooks = {
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
                await foreachHooks('beforeRequest', reqConfig)
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
                await foreachHooks('afterResponse', { request, options, response })
            }
        ]
    }
    function addHooks<K extends keyof serviceHooksType>(
        key: K,
        callback: ArrayValues<serviceHooksType[K]>
    ) {
        serviceHooks[key].push(callback as any)
    }

    async function foreachHooks<K extends keyof serviceHooksType>(
        name: K,
        arg: Parameters<ArrayValues<serviceHooksType[K]>>[0]
    ) {
        for (let i = 0; i < serviceHooks[name].length; i++) {
            const fn = serviceHooks[name][i]
            await fn(arg as never)
        }
    }

    return {
        kyHooks,
        serviceHooks,
        addHooks
    }
}
