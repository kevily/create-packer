import { insertApp } from '@/content_script/domain/app'
import Common from './common'

export function insert() {
    insertApp(document.body, {
        reactNode: <Common />,
        rootId: 'COMMON'
    })
}
