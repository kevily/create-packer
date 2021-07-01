import get from 'lodash/get'

/**
 * @param dataurl file base64
 * @param fileName file name
 * @returns Blob
 */
export default function (dataurl: string, fileName: string): Blob {
    try {
        const arr = dataurl.split(',')
        let mime = (get(arr, 0, '').match(/:(.*?);/) || [])[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        let blob: any = new Blob([u8arr], { type: mime })
        blob.lastModifiedDate = new Date()
        blob.name = fileName

        return blob
    } catch (error) {
        throw new Error(error.message)
    }
}
