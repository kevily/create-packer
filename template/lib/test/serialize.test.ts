import serialize from '../src/serialize'

test('serialize', () => {
    expect(serialize({ key: 'a', arr: ['111', 2] })).toBe('key=a&arr[0]=111&arr[1]=2')
    // @ts-ignore
    expect(serialize(['111', { a: '1' }])).toBe('')
    // @ts-ignore
    expect(serialize('111')).toBe('')
    // @ts-ignore
    expect(serialize(null)).toBe('')
    // @ts-ignore
    expect(serialize()).toBe('')
    // @ts-ignore
    expect(serialize(1)).toBe('')
})
