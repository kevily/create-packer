import { message } from '@/shared/tools'
import { CONTENT_MATCHES } from './constant'

export enum ACTIONS {
    TEST = 'TEST'
}

export interface messageType {
    [ACTIONS.TEST]: object
}
export interface responseType {}

export const action = message.create<ACTIONS, messageType, responseType>()

export function sendToAllContent<A extends ACTIONS>(
    message: message.genMessageType<A, messageType[A]>
) {
    return action.sendToContent(message, { active: true, url: CONTENT_MATCHES })
}

export function sendToCurrentContent<A extends ACTIONS>(
    message: message.genMessageType<A, messageType[A]>
) {
    return action.sendToContent(message, { active: true, url: CONTENT_MATCHES })
}
