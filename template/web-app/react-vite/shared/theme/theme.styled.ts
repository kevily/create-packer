import { CSSProperties } from 'react'
import { AnyFunc } from '1k-types'
import { isString } from 'lodash-es'

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
        grid: {
            grid: (rows: number | string, cols: number | string, gap?: number) => ({
                display: 'grid',
                gridTemplateRows: isString(rows) ? rows : `repeat(${rows}, minmax(0, 1fr))`,
                gridTemplateColumns: isString(cols) ? cols : `repeat(${cols}, minmax(0, 1fr))`,
                gap: gap ? `${gap}px` : void 0
            }),
            rows: (rows: number | string, gap?: number) => ({
                display: 'grid',
                gridTemplateRows: isString(rows) ? rows : `repeat(${rows}, minmax(0, 1fr))`,
                rowGap: gap ? `${gap}px` : void 0
            }),
            cols: (cols: number | string, gap?: number) => ({
                display: 'grid',
                gridTemplateColumns: isString(cols) ? cols : `repeat(${cols}, minmax(0, 1fr))`,
                columnGap: gap ? `${gap}px` : void 0
            })
        } satisfies Record<string, AnyFunc<CSSProperties>>
    }
}
export type themeType = typeof theme
