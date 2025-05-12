import { useState } from 'react'
import { isFunction } from 'es-toolkit'

export interface useVisibleConfigType {
    defaultVisible?: boolean
    onBeforeShow?: () => Promise<boolean | void>
    onBeforeHide?: () => Promise<boolean | void>
}
export default function useVisible(config?: useVisibleConfigType) {
    const [visible, setVisible] = useState(config?.defaultVisible ?? false)
    const onShow = async () => {
        let isShow: boolean | void = true
        if (isFunction(config?.onBeforeShow)) {
            isShow = await config?.onBeforeShow?.()
        }
        setVisible(isShow !== false)
    }
    const onClose = async () => {
        let isHide: boolean | void = true
        if (isFunction(config?.onBeforeHide)) {
            isHide = await config?.onBeforeHide?.()
        }
        setVisible(isHide === false)
    }

    return { visible, onShow, onClose }
}
