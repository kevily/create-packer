import each from 'lodash/each'
import includes from 'lodash/includes'
import size from 'lodash/size'
import isArray from 'lodash/isArray'

/**
 * @param treeList treeList
 * @param ids ids
 * @param isSameChain true -> BFS, false -> DFS
 * @returns treeNodes
 */
export default function (treeList: any[], ids: string[], isSameChain = false): any[] {
    const idsLen = size(ids)
    if (idsLen <= 0) {
        return ids
    }
    const node: any[] = []
    function DFS(_treeList: any[]) {
        each(_treeList, (treeNode) => {
            if (includes(ids, treeNode.id)) {
                node.push(treeNode)
            }
            if (size(node) >= idsLen) {
                return false
            }
            if (isArray(treeNode.children)) {
                DFS(treeNode.children)
            }
        })
    }
    function BFS(_treeList: any) {
        let idIndex = 0
        let index = 0
        while (true) {
            const treeNode = _treeList[index]
            if (treeNode.id === ids[idIndex]) {
                node.push(treeNode)
                idIndex += 1
                index = 0
                _treeList = treeNode.children
            }
            if (idIndex >= idsLen || !_treeList) {
                break
            }
        }
    }
    isSameChain ? BFS(treeList) : DFS(treeList)
    return node
}
