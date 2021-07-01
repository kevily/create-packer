import serialize from './serialize'
import isObject from 'lodash/isObject'
export interface queryType {
    [key: string]: any
}

export default function (url: string, query: queryType): string {
    if (!url || !isObject(query) || Array.isArray(query)) {
        return url
    }
    let mark: string = '?'
    if (url.endsWith('?') || url.endsWith('&')) {
        mark = ''
    } else if (url.includes('?')) {
        mark = '&'
    }
    return url + mark + serialize(query)
}
