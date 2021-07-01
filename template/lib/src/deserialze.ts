import each from 'lodash/each'
import set from 'lodash/set'
import isString from 'lodash/isString'
import last from 'lodash/last'
import split from 'lodash/split'

export interface resultType {
    [key: string]: any
}

const startRegExp = /^[\?\&]+/
const endRegExp = /[\?\&]+$/

/**
 *
 * @param data 需要被反序列化的字符串
 * @return 反序列化后的数据
 */
function deserialze(data: string): resultType {
    const result: resultType = {}
    if (data && isString(data)) {
        // Remove the heads and tails ? with &.
        // ----------------------------------------------------------------------
        data = data.replace(startRegExp, '').replace(endRegExp, '')
        // Split ?, take query.
        // ----------------------------------------------------------------------
        data = last(data.split('?'))
        const params: any[] = split(data, '&')
        each(params, (param: string) => {
            if (param) {
                const [key, val]: any[] = split(param, '=')
                set(result, `[${key}]`, decodeURIComponent(val))
            }
        })
    }
    return result
}

export default deserialze
