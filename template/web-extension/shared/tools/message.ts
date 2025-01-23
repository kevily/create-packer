import { map, unset } from 'lodash-es'

export type defActionType = string
export type messageOpsType<Action extends defActionType> = Record<Action, object>
export type genMessageType<
    Action extends defActionType,
    MessageOps extends messageOpsType<Action>[Action]
> = { action: Action } & MessageOps
export type responseType<Action extends defActionType> = { [key in Action]?: any }
export type actionHandlerType<Message, Response> = (
    message: Message,
    sender: chrome.runtime.MessageSender,
    callback: (response?: Response) => void
) => any
class MessageConstructor<
    Action extends defActionType,
    MessageConfig extends messageOpsType<Action>,
    Response extends responseType<Action>
> {
    action: {
        [key: string]: actionHandlerType<
            genMessageType<Action, MessageConfig[Action]>,
            Response[Action]
        >
    }
    constructor() {
        this.action = {}
    }
    initListener() {
        chrome.runtime.onMessage.addListener((message, sender, callback) => {
            this.action[message.action]?.(message, sender, callback)
            return true
        })
    }
    addListener<A extends Action>(
        action: A,
        callback: actionHandlerType<genMessageType<A, MessageConfig[A]>, Response[A]>
    ) {
        this.action[action] = callback
    }
    removeListener(action: Action) {
        unset(this.action, action)
    }
    async send<A extends Action>(message: genMessageType<A, MessageConfig[A]>) {
        return new Promise<Response[A]>(resolve => {
            chrome.runtime.sendMessage(message, response => resolve(response))
        })
    }
    async sendToContent<A extends Action>(
        message: genMessageType<A, MessageConfig[A]>,
        tabConfig: chrome.tabs.QueryInfo
    ) {
        const tabs = await chrome.tabs.query(tabConfig)
        return await Promise.all(
            map(tabs, tab => {
                return new Promise<Response[A]>(resolve => {
                    chrome.tabs.sendMessage(tab.id!, message, response => resolve(response))
                })
            })
        )
    }
}

export function create<
    Action extends defActionType,
    MessageOps extends messageOpsType<Action>,
    Response extends responseType<Action>
>() {
    return new MessageConstructor<Action, MessageOps, Response>()
}
