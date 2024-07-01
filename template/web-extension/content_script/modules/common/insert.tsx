import { insertRC } from '@/content_script/domain/app'
import Common from './common'

export function insert() {
    insertRC(document.body, {
        reactNode: <Common />
    })
}
