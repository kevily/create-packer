import { KyInstance, Options } from 'ky'
import { Input } from 'ky/distribution/types/options'
import { includes, isFunction, isString, omit } from 'lodash-es'
import { stringify } from 'qs'
import { Nullable } from '1k-types'
import { configType, httpErrorNameType, requestOptionsType, serviceHooksType } from '../types'
import { createKyRequestHooks } from './hooks'
import { FetchError } from './base'

export function createRequestActions(
    prefixUrl: configType['prefixUrl'],
    request: KyInstance,
    hooks: serviceHooksType
) {
    function creator(method: Required<Options>['method']) {
        return async function <DATA = any>(url: Input, option?: requestOptionsType): Promise<DATA> {
            const globalPrefix = isFunction(prefixUrl) ? await prefixUrl() : prefixUrl
            const $prefix = isFunction(option?.prefixUrl)
                ? await option!.prefixUrl()
                : option?.prefixUrl
            const newHooks: serviceHooksType = {
                beforeRequest: [...hooks.beforeRequest, ...(option?.hooks?.beforeRequest || [])],
                afterResponse: [...hooks.afterResponse, ...(option?.hooks?.afterResponse || [])],
                httpError: [...hooks.httpError, ...(option?.hooks?.httpError || [])]
            }
            const newOption = {
                ...omit(option, 'responseType'),
                prefixUrl: $prefix ?? globalPrefix,
                hooks: createKyRequestHooks(newHooks)
            }
            try {
                const res = request[method](url, newOption)
                if (option?.responseType === 'response') {
                    return await res
                }
                return await res[option?.responseType || 'json']()
            } catch (e: any) {
                const searchParamsString = stringify(newOption?.searchParams, {
                    addQueryPrefix: true
                })
                let httpBody: Nullable<string> = void 0
                if (newOption && isString(newOption?.body)) {
                    httpBody = newOption.body
                } else if (newOption?.body) {
                    httpBody = 'other'
                } else if (newOption?.json) {
                    httpBody = JSON.stringify(newOption.json)
                }
                const $prefix = newOption.prefixUrl ? `${newOption.prefixUrl}/` : ''
                let error = new FetchError(
                    new Request($prefix + url + searchParamsString, {
                        method,
                        body: httpBody
                    })
                )
                error.message = e.message
                if (
                    includes([httpErrorNameType.HTTPError, httpErrorNameType.TimeoutError], e.name)
                ) {
                    error = e
                }
                for (let i = 0; i < newHooks.httpError.length; i++) {
                    await hooks.httpError[i](error)
                }
                throw error
            }
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
