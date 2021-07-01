import map from 'lodash/map'
import last from 'lodash/last'

/**
 * @description Merge currentPath to parentPath.
 * @param parentPath
 * @param currentPath
 * @returns whole path
 */
export function mergePath(parentPath: string, currentPath: string): string {
    return parentPath === '' ? currentPath : `${parentPath}-${currentPath}`
}

/**
 * @description transform indexPath to lodash.get path.
 * @description indexToLodashPath('0-1-2') -> '[0].children[1].children[2]'
 * @param indexPath
 * @returns lodash usable path
 */
export function indexToLodashPath(indexPath: string): string {
    if (!indexPath) {
        return ''
    }
    return `[${indexPath.replace(/-/g, '].children[')}]`
}

/**
 * @param indexPath
 * @param allPath By default is false.
 * @returns By default, return parent path.
 * @returns If you set allPath as true, return every path from top level node to tail
 */
export function getParentPath(indexPath: string, allPath = false): undefined | string | string[] {
    const indexs = indexPath.split('-')
    let prevIndex = ''
    let allParentPath = map(indexs, (path) => {
        prevIndex = prevIndex === '' ? path : `${prevIndex}-${path}`
        return prevIndex
    })
    // remove self
    // ----------------------------------------------------------------------
    allParentPath.pop()

    return allPath ? allParentPath : last(allParentPath)
}
