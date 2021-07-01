import storage from '../src/storage'

const DATA = { test: '1' }
const STRING = '1'

test('storage', () => {
    // local
    // ----------------------------------------------------------------------
    expect(storage('local').set('test', DATA)).toEqual(DATA)
    expect(storage('local').get('test')).toEqual(DATA)
    expect(
        storage('local').set('test', '2', (oldVal, newVal) => {
            return {
                ...oldVal,
                test2: newVal,
            }
        })
    ).toEqual({ ...DATA, test2: '2' })
    // session
    // ----------------------------------------------------------------------
    storage('session').set('test', DATA)
    expect(storage('session').get('test')).toEqual(DATA)
    expect(
        storage('session').set('test', '2', (oldVal, newVal) => {
            return {
                ...oldVal,
                test2: newVal,
            }
        })
    ).toEqual({ ...DATA, test2: '2' })
})
