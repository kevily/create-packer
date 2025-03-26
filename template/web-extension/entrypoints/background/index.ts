import { backgroundMessage } from '@/shared/background'

export default defineBackground(() => {
    backgroundMessage.onMessage('test', async () => {
        return '1'
    })
})
