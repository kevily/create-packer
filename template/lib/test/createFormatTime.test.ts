import dayjs from 'dayjs'
import moment from 'moment'
import createFormatTime from '../src/createFormatTime'

const ARR = {
    default: ['2020-02-02', '2020-02-05'],
    second: ['2020-02-02 00:00:00', '2020-02-05 00:00:00'],
    unix: [dayjs('2020-02-02').unix(), dayjs('2020-02-05').unix()],
    result: {
        ss: '2020-02-02 00:00:00~2020-02-05 00:00:00',
        DD: '2020-02-02~2020-02-05'
    }
}

test('datjs', () => {
    // day
    // ----------------------------------------------------------------------
    expect(createFormatTime(dayjs, 'DD')('2020-2-2')).toBe('2020-02-02')
    // unix
    // ----------------------------------------------------------------------
    expect(createFormatTime(dayjs, 'DD', 'unix')(dayjs('2020-2-2').unix())).toBe('2020-02-02')

    // second
    // ----------------------------------------------------------------------
    expect(createFormatTime(dayjs, 'ss')('2020-2-2')).toBe('2020-02-02 00:00:00')
    // unix
    // ----------------------------------------------------------------------
    expect(createFormatTime(dayjs, 'ss', 'unix')(dayjs('2020-2-2').unix())).toBe(
        '2020-02-02 00:00:00'
    )
    // arr, day
    // ----------------------------------------------------------------------
    expect(createFormatTime(dayjs, 'DD')(ARR.default)).toBe(ARR.result.DD)
    expect(createFormatTime(dayjs, 'DD', 'unix')(ARR.unix)).toBe(ARR.result.DD)
    expect(createFormatTime(dayjs, 'DD')(ARR.second)).toBe(ARR.result.DD)
    // arr, second
    // ----------------------------------------------------------------------
    expect(createFormatTime(dayjs, 'ss')(ARR.default)).toBe(ARR.result.ss)
    expect(createFormatTime(dayjs, 'ss', 'unix')(ARR.unix)).toBe(ARR.result.ss)
    expect(createFormatTime(dayjs, 'ss')(ARR.second)).toBe(ARR.result.ss)
})
test('moment', () => {
    // day
    // ----------------------------------------------------------------------
    expect(createFormatTime(moment, 'DD')('2020-02-02')).toBe('2020-02-02')
    // unix
    // ----------------------------------------------------------------------
    expect(createFormatTime(moment, 'DD', 'unix')(moment('2020-02-02').unix())).toBe('2020-02-02')

    // second
    // ----------------------------------------------------------------------
    expect(createFormatTime(moment, 'ss')('2020-02-02')).toBe('2020-02-02 00:00:00')
    // unix
    // ----------------------------------------------------------------------
    expect(createFormatTime(moment, 'ss', 'unix')(moment('2020-02-02').unix())).toBe(
        '2020-02-02 00:00:00'
    )
    // arr, day
    // ----------------------------------------------------------------------
    expect(createFormatTime(moment, 'DD')(ARR.default)).toBe(ARR.result.DD)
    expect(createFormatTime(moment, 'DD', 'unix')(ARR.unix)).toBe(ARR.result.DD)
    expect(createFormatTime(moment, 'DD')(ARR.second)).toBe(ARR.result.DD)
    // arr, second
    // ----------------------------------------------------------------------
    expect(createFormatTime(moment, 'ss')(ARR.default)).toBe(ARR.result.ss)
    expect(createFormatTime(moment, 'ss', 'unix')(ARR.unix)).toBe(ARR.result.ss)
    expect(createFormatTime(moment, 'ss')(ARR.second)).toBe(ARR.result.ss)
})

// other
// ----------------------------------------------------------------------
test('other', () => {
    const formatDay = createFormatTime(dayjs, 'DD')
    expect(formatDay(ARR.default, '', '-')).toBe('2020-02-02-2020-02-05')
    expect(formatDay('')).toBe(undefined)
    expect(formatDay([])).toBe('')
})
