// import { request } from '@hx/core/utils'
import _ from 'lodash'
import * as base from './base'
import getTreeNodes from './getTreeNodes'
import loadParentTree from './loadParentTree'
import customize from './customize'

export interface treeNode {
    id: string
    ParentId?: string
    children: treeNode[]
    indexPath: string
    [key: string]: any
}

export default {
    ...base,
    getTreeNodes,
    loadParentTree,
    customize
}
