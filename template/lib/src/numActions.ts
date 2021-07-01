import _ from 'lodash'

export default {
    split(num: number, len?: number): string[] {
        let result = _.toString(num).split('')
        if (len) {
            result = _.concat(Array(len - _.size(result)).fill('0'), result)
        }
        return result
    },
    toPercentage(dividend: number, divisor: number, precision = 2): number {
        let rate = 0
        if (divisor > 0) {
            rate = _.round(_.divide(dividend || 0, divisor) * 100, precision)
            rate = rate > 100 ? 100 : rate
        }
        return rate
    },
    clipPercentageFromNum(target: number, clipNum: number): string[] {
        const result = Array(clipNum).fill(0)
        const percentage = _.divide(100, clipNum)
        const fillNum = window.parseInt(_.toString(_.divide(target, percentage)))
        _.times(fillNum, (i) => {
            result[i] = percentage
        })
        if (fillNum < clipNum) {
            result[fillNum] = target - fillNum * percentage
        }
        return result
    }
}
