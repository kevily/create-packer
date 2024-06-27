import { insertRC } from 'content_script/tools'
import { AppContext } from '@/shared/components'
import Common from './common'

export function insert() {
    insertRC(document.body, {
        reactNode: (
            <AppContext>
                <Common />
            </AppContext>
        )
    })
}
