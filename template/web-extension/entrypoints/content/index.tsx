import { Common } from './modules'
import { CONTENT_MATCHES } from '@/shared/content'

export default defineContentScript({
    run_at: 'document_idle',
    matches: CONTENT_MATCHES,
    main: () => {
        Common.insert()
    }
})
