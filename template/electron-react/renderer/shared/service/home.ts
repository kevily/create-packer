import { useQuery, QueryOptions } from '@tanstack/react-query'
import { HOME_DATA } from './api'

export const useHomeData = (options?: QueryOptions) => {
    return useQuery({
        ...options,
        queryKey: [HOME_DATA, ...(options?.queryKey || [])]
    })
}
