import { KyInstance, Options } from 'ky'
import { Input } from 'ky/distribution/types/options'
import { includes, isString, omit } from 'lodash-es'
import { stringify } from 'qs'
import { Nullable } from '1k-types'
import { configType, httpErrorType, requestOptionsType, serviceHooksType } from '../types'
import { FetchError } from './base'

export function createRequestActions(
    prefixUrl: configType['prefixUrl'],
    request: KyInstance,
    hooks: serviceHooksType
) {
    function creator(method: Required<Options>['method']) {
        return async function <DATA = any>(url: Input, option?: requestOptionsType): Promise<DATA> {
            try {
                return await request[method](url, omit(option, 'responseType'))[
                    option?.responseType || 'json'
                ]()
            } catch (e: any) {
                const searchParamsString = stringify(option?.searchParams, { addQueryPrefix: true })
                let httpBody: Nullable<string> = void 0
                if (option && isString(option?.body)) {
                    httpBody = option.body
                } else if (option?.body) {
                    httpBody = 'other'
                } else if (option?.json) {
                    httpBody = JSON.stringify(option.json)
                }
                let error = new FetchError(
                    new Request(prefixUrl + '/' + url + searchParamsString, {
                        method,
                        body: httpBody
                    })
                )
                error.message = e.message
                if (includes([httpErrorType.HTTPError, httpErrorType.TimeoutError], e.name)) {
                    error = e
                }
                for (let i = 0; i < hooks.httpError.length; i++) {
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
