import { CSSProperties } from 'react'
import { isString } from 'es-toolkit'
import { isNumber } from 'es-toolkit/compat'

export const theme = {
    tools: {
        ellipsis: () => ({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        }),
        lineClamp: (n: number) => ({
            '-webkit-line-clamp': `${n}`,
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden',
            display: '-webkit-box'
        }),
        size: (s: string) => ({ width: s, height: s }),
        py: (s: string) => ({ paddingTop: s, paddingBottom: s }),
        px: (s: string) => ({ paddingLeft: s, paddingRight: s }),
        my: (s: string) => ({ marginTop: s, marginBottom: s }),
        mx: (s: string) => ({ marginLeft: s, marginRight: s }),
        flex: (
            align: CSSProperties['alignItems'],
            justify: CSSProperties['justifyContent'],
            vertical?: boolean
        ) => {
            return {
                display: 'flex',
                alignItems: align,
                justifyContent: justify,
                flexDirection: vertical ? 'column' : 'row'
            } satisfies CSSProperties
        },
        /** 数字为元素数量，字符串为对应css的值  */
        grid: (
            rows: number | CSSProperties['gridTemplateRows'],
            cols: number | CSSProperties['gridTemplateColumns'],
            gap?: number | string
        ) => {
            return {
                display: 'grid',
                gridTemplateRows: isString(rows) ? rows : `repeat(${rows}, minmax(0, 1fr))`,
                gridTemplateColumns: isString(cols) ? cols : `repeat(${cols}, minmax(0, 1fr))`,
                gap: isNumber(gap) ? `${gap}px` : gap
            } satisfies CSSProperties
        }
    }
}
export type themeType = typeof theme
