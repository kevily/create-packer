import { concat, forEach, isArray, isRegExp, keys, remove, size } from 'lodash-es'
import pkg from '../package.json'

export function createChunks(chunks: { [key: string]: Array<string | RegExp> }) {
    const result: { [key: string]: string[] } = {
        vendor: keys(pkg.dependencies)
    }

    forEach(chunks, (values, key) => {
        if (!isArray(result[key])) {
            result[key] = []
        }
        forEach(values, value => {
            let modules: string[] = []
            if (isRegExp(value)) {
                modules = remove(result.vendor, name => value.test(name))
            } else {
                modules = remove(result.vendor, name => name === value)
            }
            if (size(modules) > 0) {
                result[key] = concat(result[key], modules)
            }
        })
    })
    return result
}
