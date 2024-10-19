import { Common } from './modules'

export default defineContentScript({
    run_at: 'document_start',
    matches: [
        'https://developer.chrome.com/docs/extensions/*',
        'https://developer.chrome.com/docs/webstore/*'
    ],
    main: () => {
        Common.insert()
    }
})
