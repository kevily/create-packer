import { insertApp } from 'content_script/tools'
import { AppContext } from '@/shared/components'
import Common from './common'

export function insert() {
    insertApp(document.body, {
        reactNode: (
            <AppContext>
                <Common />
            </AppContext>
        )
    })
}
