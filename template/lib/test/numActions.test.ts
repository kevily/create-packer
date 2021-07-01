import numActions from '../src/numActions'

test('numActions', () => {
    expect(numActions.split(12, 6)).toEqual(['0', '0', '0', '0', '1', '2'])
    expect(numActions.clipPercentageFromNum(65, 5)).toEqual([20, 20, 20, 5, 0])
    expect(numActions.toPercentage(10, 100)).toEqual(10)
    expect(numActions.toPercentage(10, 0)).toEqual(0)
})
