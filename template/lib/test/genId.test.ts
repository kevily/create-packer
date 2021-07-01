import genId from '../src/genId'

test('genId', () => {
    expect(typeof genId.uuid()).toBe('string')
    expect(typeof genId.simple()).toBe('string')
})
