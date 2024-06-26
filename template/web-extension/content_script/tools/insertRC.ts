import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { isFunction } from 'lodash-es'
import { Nullable } from '1k-types'

export enum insertRcStatus {
    success,
    target_not_exist,
    root_existed
}
export interface insertRcResultType {
    rootEle: Nullable<HTMLElement>
    result: boolean
    status: insertRcStatus
}
export function insertRC<T extends HTMLElement>(
    target: Nullable<T>,
    option: {
        insert?: (rootEle: HTMLElement, target: T) => void
        reactNode: ReactNode
        isReplace?: boolean
    }
) {
    const result: insertRcResultType = {
        result: false,
        rootEle: void 0,
        status: insertRcStatus.success
    }
    if (!target) {
        result.status = insertRcStatus.target_not_exist
        return result
    }
    result.rootEle = document.createElement('div')
    result.rootEle.className = import.meta.env.VITE_APP_ID
    const oldRootEle = target.querySelector?.(`.${import.meta.env.VITE_APP_ID}`)
    if (!option.isReplace && oldRootEle) {
        result.status = insertRcStatus.root_existed
        return result
    }
    oldRootEle?.remove()
    if (isFunction(option.insert)) {
        option.insert(result.rootEle, target)
    } else {
        target.appendChild(result.rootEle)
    }
    const root = createRoot(result.rootEle)
    root.render(option.reactNode)
    result.result = true
    return result
}
