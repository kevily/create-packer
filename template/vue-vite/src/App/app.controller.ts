import { onMounted } from 'vue'

export function useInit() {
    onMounted(() => {
        console.log('init')
    })
}
