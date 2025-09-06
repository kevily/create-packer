import { CSSProperties, ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { isFunction } from 'es-toolkit'
import { AppContext } from '@/shared/components'
import { classNameSpace } from '@/entrypoints/content/constants'

export enum insertAppStatus {
    success,
    target_not_exist,
    root_existed
}
export interface insertAppResultType {
    rootEle: HTMLElement | undefined | null
    result: boolean
    status: insertAppStatus
}
export function insertApp<T extends HTMLElement>(
    target: T | null | undefined,
    option: {
        insert?: (rootEle: HTMLElement, target: T) => void
        reactNode: ReactNode
        isReplace?: boolean
        rootId: string
        rootStyle?: CSSProperties
    }
) {
    const result: insertAppResultType = {
        result: false,
        rootEle: void 0,
        status: insertAppStatus.success
    }
    const rootId = `${import.meta.env.VITE_APP_ID}_${option.rootId}`
    if (!target) {
        result.status = insertAppStatus.target_not_exist
        return result
    }
    result.rootEle = document.createElement('div')
    result.rootEle.className = classNameSpace
    result.rootEle.id = rootId
    Object.assign(result.rootEle!.style, option.rootStyle)
    const oldRootEle = target.querySelector?.(`#${rootId}`)
    if (!option.isReplace && oldRootEle) {
        result.status = insertAppStatus.root_existed
        return result
    }
    oldRootEle?.remove()
    if (isFunction(option.insert)) {
        option.insert(result.rootEle, target)
    } else {
        target.appendChild(result.rootEle)
    }
    const root = createRoot(result.rootEle)
    root.render(
        <AppContext.Root classNameSpace={classNameSpace}>{option.reactNode}</AppContext.Root>
    )
    result.result = true
    return result
}
