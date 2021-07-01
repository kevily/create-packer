import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import isObjectLike from 'lodash/isObjectLike'
import isArray from 'lodash/isArray'
import each from 'lodash/each'

export interface dataType {
    [key: string]: any
}

const setRequestParams = (name: any, val: any[], params: any[]) => {
    if (isNil(val)) {
        return
    }
    if (isObject(val)) {
        for (const k in val) {
            setRequestParams(`${name}[${k}]`, val[k], params)
        }
    } else {
        params.push(`${name}=${encodeURIComponent(val)}`)
    }
}
/**
 *
 * @param data 需要处理成地址参数的对象
 * @return 地址参数，不带问号
 */
function serialize(data?: dataType): string {
    if (!isArray(data) && isObjectLike(data)) {
        let params: any[] = []
        each(data, (val, key) => setRequestParams(key, val, params))
        return params.join('&')
    }
    return ''
}

export default serialize
