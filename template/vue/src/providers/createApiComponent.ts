import app from '@/providers/app'
import { createVNode, render } from 'vue'
import { assign } from 'lodash-es'

const store = new Map()
export default function createApiComponent(component: any, props?: Record<string, any>) {
    const container = document.createElement('div')
    let vNode = store.get(component)
    if (!vNode) {
        vNode = createVNode(component)
        vNode.appContext = app._context || {}
        store.set(component, vNode)
    }
    assign(vNode.component.props, props)
    render(vNode, container)

    return {
        instance: vNode,
        el: container.firstElementChild,
        ...vNode.component?.exposed
    }
}
