import { createVNode, render, VNodeChild } from 'vue'
import { assign } from 'lodash-es'
import app from '@/providers/app'

const store = new Map()
export default function createModal<
    P extends Record<string, any>,
    E extends Record<string, any>,
    Slots extends Record<string, () => VNodeChild> = Record<string, () => VNodeChild>
>(name: string, component: any, props?: P, slots?: Slots) {
    let vNode = store.get(name)
    function updateProps(props: Partial<P>) {
        assign(vNode.component.props, props)
    }
    function updateSlots(slots?: Partial<Record<string, () => VNodeChild>>) {
        assign(vNode.component.slots, slots)
    }
    if (!vNode) {
        const container = document.createElement('div')
        vNode = createVNode(component, props, slots)
        vNode.appContext = app._context || {}
        store.set(name, vNode)
        render(vNode, container)
    } else {
        updateProps(props || {})
        updateSlots(slots)
    }
    return {
        instance: vNode,
        updateProps,
        updateSlots,
        ...(vNode.component?.exposed as E)
    }
}
