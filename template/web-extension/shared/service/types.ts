import { HTTPError, NormalizedOptions, Options, TimeoutError } from 'ky'
import { AnyArray, AnyObject, Nullable } from '1k-types'

export enum httpErrorNameType {
    'HTTPError' = 'HTTPError',
    'TimeoutError' = 'TimeoutError',
    'FetchError' = 'FetchError'
}

export type httpErrorType = HTTPError | TimeoutError
/** 接口异常返回结果 */
export type httpBodyType = Nullable<string | number | AnyObject | AnyArray>

export type beforeRequestType = (req: {
    searchParams: Record<string, any>
    body: httpBodyType
    headers: Headers
    method: Options['method']
}) => Promise<void> | void
export type httpErrorHooksType = (error: httpErrorType) => Promise<void> | void
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

export interface requestOptionsType extends Omit<Options, 'prefixUrl' | 'hooks'> {
    prefixUrl?: string | (() => string | Promise<string>)
    hooks?: Partial<serviceHooksType>
    responseType?: 'json' | 'text' | 'blob' | 'response'
}

export interface configType extends Pick<requestOptionsType, 'prefixUrl' | 'headers'> {
    globalParams?: Record<string, any>
    globalSearchParams?: Record<string, any>
    hooks?: Partial<serviceHooksType>
}
