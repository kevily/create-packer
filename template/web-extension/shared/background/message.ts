import { message } from '@/shared/tools'
export enum ACTIONS {
    TEST = 'TEST'
}

export interface messageType {
    [ACTIONS.TEST]: object
}
export interface responseType {}

export const action = message.create<ACTIONS, messageType, responseType>()
