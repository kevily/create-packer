import { defineExtensionMessaging } from '@webext-core/messaging'
import { CONTENT_MATCHES } from './constant'

export type messageType = {
    test: () => string
}

export const { sendMessage, onMessage } = defineExtensionMessaging<messageType>()
export async function sendToAllContent<A extends keyof messageType>(
    action: A,
    data?: Parameters<messageType[A]>[0]
) {
    const tabs = await chrome.tabs.query({ url: CONTENT_MATCHES })
    const result = await Promise.all(
        tabs.map(tab => {
            return sendMessage(action, data as never, { tabId: tab.id! })
        })
    )
    return result
}

export async function sendToCurrentContent<A extends keyof messageType>(
    action: A,
    data?: Parameters<messageType[A]>[0]
) {
    const tabs = await chrome.tabs.query({ active: true, url: CONTENT_MATCHES })
    const result = await sendMessage(action, data as never, { tabId: tabs[0].id! })
    return result
}
