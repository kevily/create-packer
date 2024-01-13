import { HTTPError, NormalizedOptions, Options, TimeoutError } from 'ky'
import { AnyArray, AnyObject, Nullable } from '1k-types'
import { FetchError } from './tools'

export enum httpErrorType {
    'HTTPError' = 'HTTPError',
    'TimeoutError' = 'TimeoutError',
    'FetchError' = 'FetchError'
}

export type httpBodyType = Nullable<string | number | AnyObject | AnyArray>

export type beforeRequestType = (req: {
    searchParams: Record<string, any>
    body: httpBodyType
    headers: Headers
    method: Options['method']
}) => Promise<void> | void
export type httpErrorHooksType = (
    error: HTTPError | TimeoutError | FetchError
) => Promise<void> | void
export type AfterResponseHook = (arg: {
    request: Request
    options: NormalizedOptions
    response: Response
}) => Promise<void> | void
export interface serviceHooksType {
    httpError: httpErrorHooksType[]
    beforeRequest: beforeRequestType[]
    afterResponse: AfterResponseHook[]
}

export interface configType extends Pick<Options, 'prefixUrl' | 'headers'> {
    globalParams?: Record<string, any>
    globalSearchParams?: Record<string, any>
    hooks?: Partial<serviceHooksType>
}
export interface requestOptionsType extends Options {
    responseType?: 'json' | 'text' | 'blob'
}
