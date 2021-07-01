import getFileAccept, { accept } from '../src/getFileAccept'

test('getFileAccept', () => {
    expect(getFileAccept('xls')).toBe(accept.xls)
    expect(getFileAccept('xlsx')).toBe(accept.xlsx)
    expect(getFileAccept(['xls', 'jpg'])).toBe(`${accept.xls},${accept.jpg}`)
    expect(getFileAccept('excel')).toBe(`${accept.xls},${accept.xlsx}`)
})
