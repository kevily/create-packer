import { useQuery, UndefinedInitialDataOptions } from '@tanstack/react-query'
import { HOME_DATA } from './api'

export const useHomeData = (options?: UndefinedInitialDataOptions) => {
    return useQuery({
        ...options,
        queryKey: [HOME_DATA, ...(options?.queryKey || [])]
    })
}
