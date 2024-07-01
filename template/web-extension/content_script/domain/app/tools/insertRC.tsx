import { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { isFunction } from 'lodash-es'
import { Nullable } from '1k-types'
import { AppContext } from '@/shared/components'
import { classNameSpace } from '@/content_script/constants'

export enum insertRcStatus {
    success,
    target_not_exist,
    root_existed
}
export interface insertRcResultType {
    rcRoot: Nullable<HTMLElement>
    result: boolean
    status: insertRcStatus
}
export function insertRC<T extends HTMLElement>(
    target: Nullable<T>,
    option: {
        insert?: (rcRoot: HTMLElement, target: T) => void
        reactNode: ReactNode
        isReplace?: boolean
    }
) {
    const result: insertRcResultType = {
        result: false,
        rcRoot: void 0,
        status: insertRcStatus.success
    }
    if (!target) {
        result.status = insertRcStatus.target_not_exist
        return result
    }
    result.rcRoot = document.createElement('div')
    result.rcRoot.className = classNameSpace
    const oldRootEle = target.querySelector?.(`.${classNameSpace}`)
    if (!option.isReplace && oldRootEle) {
        result.status = insertRcStatus.root_existed
        return result
    }
    oldRootEle?.remove()
    if (isFunction(option.insert)) {
        option.insert(result.rcRoot, target)
    } else {
        target.appendChild(result.rcRoot)
    }
    const root = createRoot(result.rcRoot)
    root.render(<AppContext>option.reactNode</AppContext>)
    result.result = true
    return result
}
