import { useMemo } from 'react'
import { useMatches, useSearchParams } from 'react-router-dom'
import { parse } from 'qs'
import { map } from 'lodash-es'
import { getRoute } from '@/router/router.tool'
import { routeType } from '@/router/router.types'

export function useQuery<Q extends Record<string, any>>() {
    const [params] = useSearchParams()
    const query = parse(params.toString())

    return query as Q
}

export function useMatchesRoute(): routeType[] {
    const matches = useMatches()
    return useMemo(() => map(matches, o => getRoute(o.id)), [matches])
}
