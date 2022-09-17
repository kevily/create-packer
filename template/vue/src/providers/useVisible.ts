import { ref } from 'vue'
import { isFunction } from 'lodash-es'

export interface useVisibleConfigType {
    onBeforeShow?: () => Promise<boolean | void>
    onBeforeHide?: () => Promise<boolean | void>
}
export default function useVisible(config?: useVisibleConfigType) {
    const visible = ref(false)
    const onShow = async () => {
        let isShow: boolean | void = true
        if (isFunction(config?.onBeforeShow)) {
            isShow = await config?.onBeforeShow?.()
        }
        visible.value = isShow !== false
    }
    const onClose = async () => {
        let isHide: boolean | void = true
        if (isFunction(config?.onBeforeHide)) {
            isHide = await config?.onBeforeHide?.()
        }
        visible.value = isHide === false
    }

    return { visible, onShow, onClose }
}
