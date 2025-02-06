import { useQuery } from '@tanstack/vue-query'
import { request } from './request'
import { HOME_DATA } from './api'

export function useHomeQuery() {
    return useQuery({
        queryKey: ['home_data'],
        queryFn: () => request.post(HOME_DATA)
    })
}
