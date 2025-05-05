import { CONTENT_MATCHES } from '@/shared/content'
import { Common } from './modules'

export default defineContentScript({
    runAt: 'document_idle',
    matches: CONTENT_MATCHES,
    main: () => {
        Common.insert()
    }
})
