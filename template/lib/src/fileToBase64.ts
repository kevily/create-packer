export default function (file: Blob | File): Promise<any> {
    if (!file) {
        return Promise.reject('File resolution failed')
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function () {
            resolve(reader.result)
            reader.onerror = reader.onload = null
        }
        reader.onerror = function (e) {
            reader.abort()
            reject('File resolution failed')
            reader.onerror = reader.onload = null
        }
        reader.readAsDataURL(file)
    })
}
