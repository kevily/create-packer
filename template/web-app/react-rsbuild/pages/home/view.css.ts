import { tss } from '@/shared/styles'

export const useStyles = tss.create(({ theme }) => ({
    root: {
        ...theme.tools.flex('center', 'center')
    }
}))
