import treeActions from '../src/treeActions'
import _ from 'lodash'

const TREE_LIST = [
    {
        title: '1',
        id: '1',
        children: [
            {
                title: '1-1',
                id: '1-1',
                ParentId: '1',
                children: [
                    {
                        title: '1-1-1',
                        id: '1-1-1',
                        ParentId: '1-1'
                    }
                ]
            }
        ]
    }
]

const LEVEL_TOP = TREE_LIST[0]
const LEVEL_1 = TREE_LIST[0].children[0]
const LEVEL_2 = TREE_LIST[0].children[0].children[0]

const IDS = ['1-1-1']

test('getParentPath', () => {
    expect(treeActions.getParentPath('1-1-1')).toBe('1-1')
    expect(treeActions.getParentPath('1-1-1', true)).toEqual(['1', '1-1'])
})

test('mergePath', () => {
    expect(treeActions.mergePath('1-1', '1')).toBe('1-1-1')
})

test('indexToLodashPath', () => {
    expect(treeActions.indexToLodashPath('1-1-1')).toBe('[1].children[1].children[1]')
})

test('getTreeNodes', () => {
    expect(treeActions.getTreeNodes(TREE_LIST, IDS)).toEqual([LEVEL_2])
    expect(
        treeActions.getTreeNodes(TREE_LIST, [LEVEL_TOP.id, LEVEL_1.id, LEVEL_2.id], true)
    ).toEqual([LEVEL_TOP, LEVEL_1, LEVEL_2])
})

test('customize', () => {
    const treeList = _.cloneDeep(TREE_LIST)
    treeActions.customize({
        treeList,
        childrenKey: 'children',
        setTreeNode: treeNode => {
            treeNode.custom = 'custom'
        }
    })
    expect(treeList).toEqual([
        {
            title: '1',
            id: '1',
            indexPath: '0',
            custom: 'custom',
            children: [
                {
                    title: '1-1',
                    id: '1-1',
                    ParentId: '1',
                    indexPath: '0-0',
                    custom: 'custom',
                    children: [
                        {
                            title: '1-1-1',
                            id: '1-1-1',
                            ParentId: '1-1',
                            indexPath: '0-0-0',
                            custom: 'custom'
                        }
                    ]
                }
            ]
        }
    ])
})

test('loadParentTree', async () => {
    const treeList = treeActions.customize({
        treeList: [_.omit(LEVEL_TOP, 'children')],
        childrenKey: 'children'
    })
    const result = await treeActions.loadParentTree(treeList, '1-1-1', async nodeId => {
        const treeNode = await Promise.resolve(treeActions.getTreeNodes(TREE_LIST, [nodeId]))
        return treeActions.customize({ treeList: treeNode, childrenKey: 'children' })[0]
    })
    expect(result).toEqual({ ParentId: '1-1', id: '1-1-1', indexPath: '0-0-0', title: '1-1-1' })
    expect(treeList).toEqual([
        {
            title: '1',
            id: '1',
            indexPath: '0',
            children: [
                {
                    title: '1-1',
                    id: '1-1',
                    ParentId: '1',
                    indexPath: '0-0',
                    children: [
                        {
                            title: '1-1-1',
                            id: '1-1-1',
                            ParentId: '1-1',
                            indexPath: '0-0-0'
                        }
                    ]
                }
            ]
        }
    ])
})
