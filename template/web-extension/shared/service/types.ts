import { Options, HTTPError } from 'ky'
import { Nullable } from '1k-types'

export interface configType extends Pick<Options, 'prefixUrl' | 'headers'> {
    globalParams?: Record<string, any>
    globalSearchParams?: Record<string, any>
}
export interface requestOptionsType extends Options {
    responseType?: 'json' | 'text' | 'blob'
}

export type beforeRequestType = (req: {
    searchParams: Record<string, any>
    body: Nullable<Record<string, any>>
    headers: Headers
    method: Options['method']
}) => Promise<void> | void
export type beforeErrorType = (error: HTTPError) => Promise<void> | void
export interface serviceHooksType {
    beforeError: beforeErrorType[]
    beforeRequest: beforeRequestType[]
}
