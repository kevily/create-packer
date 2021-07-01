import map from 'lodash/map'
import isArray from 'lodash/isArray'

export const accept = {
    // excel
    // ----------------------------------------------------------------------
    excel: '',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // word
    // ----------------------------------------------------------------------
    word: '',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // image
    // ----------------------------------------------------------------------
    image: 'image/*',
    jpg: 'image/jpg, image/jpeg',
    png: 'image/png, image/x-png',
    gif: 'image/gif',
    webp: 'image/webp',
    // video
    // ----------------------------------------------------------------------
    video: 'video/*',
    mp4: 'video/mp4',
    // audio
    // ----------------------------------------------------------------------
    audio: 'audio/*',
    mp3: 'audio/mpeg',
    flac: 'audio/flac'
}
accept.excel = `${accept.xls},${accept.xlsx}`
accept.word = `${accept.doc},${accept.docx}`

type acceptType = typeof accept

export default function <T extends keyof acceptType>(fileType: T | T[]) {
    if (isArray(fileType)) {
        return map(fileType, (value) => accept[value]).join(',')
    }
    return accept[fileType] || ''
}
