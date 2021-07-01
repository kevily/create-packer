import { mergePath } from './base'
import get from 'lodash/get'
import map from 'lodash/map'
import isFunction from 'lodash/isFunction'
import toArray from 'lodash/toArray'
import { treeNode } from './index'

export interface anyObj {
    [key: string]: any
}

export interface customizeArgType {
    treeList: any[]
    /** default 'children' */
    childrenKey?: string
    setTreeNode?: (treeNode: anyObj, index: number, parentTree?: anyObj) => void
    parentTree?: treeNode
}
/**
 * @description Auto add indexPath.
 * @param parentTree
 * @param childrenKey default 'children'
 * @returns new TreeList,  children field === 'children'
 */
export default function customize({
    treeList,
    setTreeNode,
    parentTree,
    childrenKey = 'children'
}: customizeArgType): treeNode[] {
    return map(toArray(treeList), (treeNode, index) => {
        const children = treeNode[childrenKey]
        delete treeNode[childrenKey]

        treeNode.indexPath = mergePath(get(parentTree, 'indexPath', ''), `${index}`)
        isFunction(setTreeNode) && setTreeNode(treeNode, index, parentTree)
        if (children) {
            treeNode.children = customize({
                treeList: children,
                setTreeNode,
                childrenKey,
                parentTree: treeNode
            })
        }
        return treeNode
    })
}
