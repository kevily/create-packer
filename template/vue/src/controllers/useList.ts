import { ref, reactive, computed, unref } from 'vue'
import { cloneDeep, concat, assign, pick, isNil, size, map } from 'lodash-es'

export interface stateType<ListItem, P> {
    loading: boolean
    total: number
    params: P
    list: ListItem[]
    sum: Record<string, any>
    selected: any[]
    pagination: {
        current: number
        pageSize: number
        total: number
    }
    selectedLen: number
}
export interface createListStorePropsType<ListItem, P> {
    /**
     * @description 默认请求参数
     */
    defaultParams: P
    /** 列表请求 */
    fetch: (
        state: Pick<stateType<ListItem, P>, 'pagination' | 'selected' | 'total' | 'params'>
    ) => Promise<{
        list: any[]
        page?: number
        pageSize?: number
        total?: number
        sum?: Record<string, any>
    }>
    /** 初始化列表时的配置 */
    initConfig?: {
        /** 初始化的时候需要保留值的字段 */
        keepParamsKeys?: Array<keyof P>
    }
}

export default function createListStore<
    ListItem extends Record<string, any>,
    P extends { page?: number; pageSize?: number; [key: string]: any }
>(config: createListStorePropsType<ListItem, P>) {
    const loading = ref<stateType<ListItem, P>['loading']>(true)
    const total = ref<stateType<ListItem, P>['total']>(0)
    const params = reactive<stateType<ListItem, P>['params']>(cloneDeep(config.defaultParams))
    const list = ref<stateType<ListItem, P>['list']>([])
    const sum = reactive<stateType<ListItem, P>['sum']>({})
    const selected = ref<stateType<ListItem, P>['selected']>([])
    const pagination = computed<stateType<ListItem, P>['pagination']>(() => ({
        current: params.page || 0,
        pageSize: params.pageSize || 0,
        total: total.value
    }))
    const selectedLen = computed<stateType<ListItem, P>['selectedLen']>(() => size(selected.value))
    function resetParams() {
        assign(params, cloneDeep(config.defaultParams))
    }
    async function fetchList(arg?: { params?: Partial<P>; isConcat?: boolean; isInit?: boolean }) {
        loading.value = true
        try {
            if (arg?.isInit) {
                assign(
                    params,
                    cloneDeep(config.defaultParams),
                    pick(params, config?.initConfig?.keepParamsKeys || [])
                )
            }
            assign(params, arg?.params)
            const result = await config.fetch({
                pagination: unref(pagination),
                selected: unref(selected),
                total: unref(total),
                params
            })
            const newData = map(result.list, (item: any) => ({
                ...item,
                __active__: {
                    campaign: false,
                    adGroup: false,
                    target: false,
                    searchTerm: false
                }
            }))
            list.value = !isNil(result.page) && arg?.isConcat ? concat(list, newData) : newData
            sum.value = result.sum || {}
            total.value = result.total || total.value
            params.page = result.page || params.page
            params.pageSize = result.pageSize || params.pageSize
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        total,
        params,
        list,
        sum,
        selected,
        pagination,
        selectedLen,
        resetParams,
        fetchList
    }
}
