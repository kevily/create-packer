import { defineExtensionMessaging } from '@webext-core/messaging'

export type messageType = {
    test: () => Promise<string>
}

export const { sendMessage, onMessage } = defineExtensionMessaging<messageType>()
