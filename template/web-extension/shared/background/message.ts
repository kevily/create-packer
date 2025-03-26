import { defineExtensionMessaging } from '@webext-core/messaging'

export type messageType = {
    test: () => string
}

export const { sendMessage, onMessage } = defineExtensionMessaging<messageType>()
