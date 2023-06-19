import type { UseBoundStore, StoreApi } from 'zustand'
export type ExtractArrayElType<T> = T extends Array<infer E> ? E : unknown
export type ExtractReadonlyArrayElType<T> = T extends ReadonlyArray<infer E> ? E : unknown
export type ExtractReadonlyArrayFieldType<T, K extends keyof any> = T extends ReadonlyArray<infer V>
    ? V extends { [key in K]: infer V2 }
        ? V2
        : any
    : any
export type ExtractArrayFieldType<T, K extends keyof any> = T extends Array<infer V>
    ? V extends { [key in K]: infer V2 }
        ? V2
        : any
    : any

export type UnReadonly<R extends Record<string, any>> = {
    -readonly [K in keyof R]: R[K]
}
export type ValueType<R extends Record<string, any>> = R extends Record<string, infer V> ? V : R
export type ExtractModelType<T> = T extends UseBoundStore<StoreApi<infer S>> ? S : unknown
