import type { UseBoundStore, StoreApi } from 'zustand'

export type ExtractModelType<T> = T extends UseBoundStore<StoreApi<infer S>> ? S : unknown
