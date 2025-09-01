import { defineExtensionMessaging } from '@webext-core/messaging'
import { CONTENT_MATCHES } from './constant'

export type messageType = {
    CONNECT: () => true
}

export const { sendMessage, onMessage } = defineExtensionMessaging<messageType>()

export async function connectableTabs(tabQueryInfo?: chrome.tabs.QueryInfo) {
    const tabs = await chrome.tabs.query({
        ...tabQueryInfo,
        url: tabQueryInfo?.url || CONTENT_MATCHES
    })
    const result = await Promise.allSettled(
        tabs.map(tab => {
            return sendMessage('CONNECT', void 0, { tabId: tab.id! }).then(res => ({
                data: res,
                tab
            }))
        })
    )
    return result?.filter(o => o.status === 'fulfilled').map(o => o.value.tab)
}

export async function sendToContent<A extends keyof messageType>(
    action: A,
    options: {
        data?: Parameters<messageType[A]>[0]
        url?: string[]
        target: 'first' | 'last' | 'all' | 'current'
    }
) {
    let tabs = await connectableTabs({ url: options?.url })
    switch (options.target) {
        case 'current':
            tabs = tabs.filter(tab => tab.active)
            break
        case 'first':
            tabs = tabs.slice(0, 1)
            break
        case 'last':
            tabs = tabs.slice(-1)
            break
        default:
            break
    }
    const result = await Promise.all(
        tabs.map(tab => {
            return sendMessage(action, options.data as never, { tabId: tab.id! }).catch(
                () => void 0
            )
        })
    )
    return result
}
