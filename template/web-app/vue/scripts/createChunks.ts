import { isRegExp, remove } from 'es-toolkit'
import { concat, forEach, forOwn, isArray, size } from 'es-toolkit/compat'
import pkg from '../package.json'

export function createChunks(chunks: { [key: string]: Array<string | RegExp> }) {
    const vendor = Object.keys(pkg.dependencies)
    const result: { [key: string]: string[] } = {}

    forOwn(chunks, (values, key) => {
        if (!isArray(result[key])) {
            result[key] = []
        }
        forEach(values, value => {
            let modules: string[] = []
            if (isRegExp(value)) {
                modules = remove(vendor, name => value.test(name))
            } else {
                modules = remove(vendor, name => name === value)
            }
            if (size(modules) > 0) {
                result[key] = concat(result[key], modules)
            }
        })
    })
    result.vendor = vendor
    return result
}
