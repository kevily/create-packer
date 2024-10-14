import { useQuery } from '@tanstack/react-query'

export function useHomeQuery() {
    return useQuery({
        queryKey: ['home_data'],
        queryFn: () => [{ name: '1' }]
    })
}
