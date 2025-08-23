import { CONTENT_MATCHES, contentMessage } from '@/shared/content'
import { Common } from './modules'

export default defineContentScript({
    runAt: 'document_idle',
    matches: CONTENT_MATCHES,
    main: () => {
        contentMessage.onMessage('CONNECT', () => true)
        Common.insert()
    }
})
