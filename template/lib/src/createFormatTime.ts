import isArray from 'lodash/isArray'
import each from 'lodash/each'
import size from 'lodash/size'

export type formatType = keyof typeof DATE_FORMAT
export type dataType = keyof typeof formatFn

const DATE_FORMAT = {
    DD: 'YYYY-MM-DD',
    HH: 'YYYY-MM-DD HH',
    mm: 'YYYY-MM-DD HH:mm',
    ss: 'YYYY-MM-DD HH:mm:ss'
}

const formatFn = {
    unix(fn: any, time: any, format: string, defaultValue: string) {
        return time ? fn(time * 1000).format(format) : defaultValue
    },
    default(fn: any, time: any, format: string, defaultValue: string) {
        return time ? fn(time).format(format) : defaultValue
    }
}

/**
 *
 * @param fn dayjs | moment
 * @param format 时间格式字段
 * @param time 需要被格式化的数据
 * @param defaultValue 值不存在的时候使用
 * @param separator 值为数组的时候两个多个时间之间的分隔符,默认为'~'
 */
function createFormatTime(fn: any, format: formatType, dataType: dataType = 'default') {
    return function (time: any | any[], defaultValue?: string, separator = '~'): string {
        if (isArray(time)) {
            const formatTime = createFormatTime(fn, format, dataType)
            const _times: string[] = []
            each(time, (t) => {
                if (t) {
                    _times.push(formatTime(t, ''))
                }
            })
            return size(_times) === size(time) ? _times.join(separator) : defaultValue
        }
        return formatFn[dataType](fn, time, DATE_FORMAT[format], defaultValue)
    }
}

export default createFormatTime
