import  { type UseBoundStore, type StoreApi } from 'zustand'
export type ExtractModelType<T> = T extends UseBoundStore<StoreApi<infer S>> ? S : unknown
