import getTreeNodes from './getTreeNodes'
import customize from './customize'
import { indexToLodashPath } from './base'
import size from 'lodash/size'
import get from 'lodash/get'
import set from 'lodash/set'
import findIndex from 'lodash/findIndex'
import { treeNode } from './index'

export default async function (
    treeList: any[],
    nodeId: string,
    fetchTreeNode: (parentId: string) => Promise<treeNode>
): Promise<treeNode> {
    //  lastNode.id === nodeId
    // ----------------------------------------------------------------------
    let node: any = getTreeNodes(treeList, [nodeId])
    let lastNode = get(node, [0], {})
    if (size(node) <= 0) {
        let lastNodeIndexPath = get(node, '[0].indexPath', '')
        node = await fetchTreeNode(nodeId)
        while (true) {
            const parentNode = await fetchTreeNode(node.ParentId)

            const parentDataSource = getTreeNodes(treeList, [parentNode.id])
            // Exists in the treeList, or parentNode is not exist
            // ----------------------------------------------------------------------
            if (!parentNode.ParentId || size(parentDataSource) > 0) {
                node = customize({
                    treeList: [node],
                    parentTree: parentDataSource[0]
                })[0]
                lastNodeIndexPath = indexToLodashPath(lastNodeIndexPath)
                lastNode = get(node, `children${lastNodeIndexPath}`)
                // Merge to treeList
                // ----------------------------------------------------------------------
                set(treeList, indexToLodashPath(node.indexPath), node)
                break
            }

            // Merge children to parentNode, and assign parentNode to node
            // ----------------------------------------------------------------------
            const nodeIndex = findIndex(parentNode.children, (o: any) => o.id === node.id)
            parentNode.children[nodeIndex] = node
            node = parentNode
            // Record lastNodeIndexPath，used for pick lastNode
            // ----------------------------------------------------------------------
            lastNodeIndexPath = lastNodeIndexPath ? nodeIndex + lastNodeIndexPath : `${nodeIndex}`
        }
    }
    return lastNode
}
