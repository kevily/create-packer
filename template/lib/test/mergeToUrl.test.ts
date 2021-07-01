import mergeToUrl from '../src/mergeToUrl'

test('mergeToUrl', () => {
    const url = 'https://www.google.cn'
    expect(mergeToUrl(url, { key: 'value' })).toBe(url + '?key=value')
    expect(mergeToUrl(url + '?', { key: 'value' })).toBe(url + '?key=value')
    expect(mergeToUrl(url + '?', { key: 'value' })).toBe(url + '?key=value')
    expect(mergeToUrl(url + '?a=1', { key: 'value' })).toBe(url + '?a=1&key=value')
    // Don't do that
    // ----------------------------------------------------------------------
    expect(mergeToUrl(url + '&', { key: 'value' })).toBe(url + '&key=value')
})
