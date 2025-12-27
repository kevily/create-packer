import { createVNode, render, VNodeChild } from 'vue'
import app from './app.vue'

const store = new Map()

function reset(oldObj: Record<string, any>, newObj: Record<string, any>) {
    Object.keys(oldObj).forEach(k => {
        oldObj[k] = void 0
    })
    Object.assign(oldObj, newObj)
}

export function createComponentInstance<
    P extends Record<string, any>,
    E extends Record<string, any>,
    Slots extends Record<string, () => VNodeChild> = Record<string, () => VNodeChild>
>(name: string, component: any, props?: P, slots?: Slots) {
    let vNode = store.get(name)
    function updateProps(props: Partial<P>) {
        reset(vNode.component.props, props)
    }

    function updateSlots(slots: Partial<Record<string, () => VNodeChild>>) {
        reset(vNode.component.slots, slots)
    }

    if (!vNode) {
        const container = document.createElement('div')
        vNode = createVNode(component, props, slots)
        vNode.appContext = app._context || {}
        store.set(name, vNode)
        render(vNode, container)
    } else {
        updateProps(props || {})
        updateSlots(slots || {})
    }
    return {
        instance: vNode,
        updateProps,
        updateSlots,
        ...(vNode.component?.exposed as E)
    }
}
