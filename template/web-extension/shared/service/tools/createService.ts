import ky from 'ky'
import { assign, isArray, isObject } from 'lodash-es'
import { configType } from '../types'
import { createRequestActions } from './createRequestActions'
import { createServiceHooks } from './hooks'

export function createService(config: configType) {
    const { addHooks, serviceHooks } = createServiceHooks()
    const globalParams: configType['globalParams'] = assign({}, config.globalParams)
    const globalSearchParams: configType['globalSearchParams'] = assign(
        {},
        config.globalSearchParams
    )
    const request = ky.create({
        prefixUrl: '',
        headers: config.headers
    })
    const requestActions = createRequestActions(config.prefixUrl, request, serviceHooks)

    function setGlobalParams(params: configType['globalParams']) {
        assign(globalParams, params)
    }
    function setGlobalSearchParams(params: configType['globalSearchParams']) {
        assign(globalSearchParams, params)
    }

    // init
    // ------------------------------------------------------------------------
    addHooks('beforeRequest', async req => {
        const { searchParams, body } = req
        req.searchParams = { ...globalSearchParams, ...searchParams }

        if (!isArray(body) && isObject(body)) {
            req.body = { ...globalParams, ...body }
        }
    })

    return {
        instance: request,
        ...requestActions,
        addHooks,
        setGlobalParams,
        setGlobalSearchParams
    }
}
