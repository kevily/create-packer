export default {
    uuid() {
        let d = new Date().getTime()
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now()
        }
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        })
    },
    simple() {
        return Math.random().toString(36).slice(2)
    }
}
