import { createVNode, render } from 'vue'
import { merge } from 'lodash-es'

export default function renderToDom(component: any, props?: Record<string, any>) {
    const container = document.createElement('div')
    const instance = createVNode(component)
    merge(instance.props, props)
    render(instance, container)
    document.body.appendChild(container)

    return {
        context: instance,
        destroy: () => render(null, container),
        ...instance.component?.exposed
    }
}
