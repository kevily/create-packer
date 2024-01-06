import ky, { Hooks, KyInstance, Options } from 'ky'
import { Input } from 'ky/distribution/types/options'
import { assign, includes, isArray, isObject, omit } from 'lodash-es'
import { parse, stringify } from 'qs'
import { ArrayValues } from '1k-types'
import { configType, requestOptionsType, serviceHooksType } from './types'

function createServiceHooks() {
    const serviceHooks: serviceHooksType = {
        beforeError: [],
        beforeRequest: []
    }
    const kyHooks: Hooks = {
        beforeError: [
            async error => {
                await foreachHooks('beforeError', error)
                return error
            }
        ],
        beforeRequest: [
            async req => {
                // eslint-disable-next-line prefer-const
                let [url, searchParams] = req.url.split('?')
                let reqBody = void 0
                if (!includes(['GET', 'HEAD'], req.method)) {
                    try {
                        reqBody = await req.json()
                    } catch {
                        /* empty */
                    }
                }
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

function createRequestActions(request: KyInstance) {
    function creator(method: Required<Options>['method']) {
        return function <DATA = any>(url: Input, option?: requestOptionsType): Promise<DATA> {
            return request[method](url, omit(option, 'responseType'))[
                option?.responseType || 'json'
            ]()
        }
    }

    return {
        get: creator('get'),
        post: creator('post'),
        put: creator('put'),
        patch: creator('patch'),
        head: creator('head'),
        delete: creator('delete')
    }
}
export type requestActionsType = ReturnType<typeof createRequestActions>

export function createService(config: configType) {
    const { kyHooks, addHooks } = createServiceHooks()
    const globalParams: configType['globalParams'] = assign({}, config.globalParams)
    const globalSearchParams: configType['globalSearchParams'] = assign(
        {},
        config.globalSearchParams
    )
    const request = ky.create({
        prefixUrl: config.prefixUrl,
        headers: config.headers,
        hooks: kyHooks
    })
    const requestActions = createRequestActions(request)

    function setGlobalParams(params: configType['globalParams']) {
        assign(globalParams, params)
    }
    function setGlobalSearchParams(params: configType['globalSearchParams']) {
        assign(globalSearchParams, params)
    }

    // 初始化
    // ------------------------------------------------------------------------
    addHooks('beforeRequest', async req => {
        const { searchParams, body } = req
        req.searchParams = { ...globalSearchParams, ...searchParams }

        if (!isArray(body) && isObject(body)) {
            req.body = { ...globalParams, ...body }
        }
    })

    return {
        instance: request,
        ...requestActions,
        addHooks,
        setGlobalParams,
        setGlobalSearchParams
    }
}
