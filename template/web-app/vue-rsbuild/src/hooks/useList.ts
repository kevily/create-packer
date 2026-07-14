import { ref, reactive, computed, unref } from 'vue'
import { cloneDeep, pick, isNil } from 'es-toolkit'
import { assign, size, max } from 'es-toolkit/compat'

export interface configType<ListItem, P> {
    /**
     * @description 默认请求参数
     */
    defaultParams: P
    /** 列表请求 */
    fetch: (state: { params: P }) => Promise<{
        list: ListItem[]
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
    P extends { page?: number; pageSize?: number; [key: string]: any },
    ListItem extends Record<string, any> = Record<string, any>
>(config: configType<ListItem, P>) {
    const loading = ref(true)
    const total = ref(0)
    const params = reactive(cloneDeep(config.defaultParams))
    const list = ref<ListItem[]>([])
    const sum = reactive<Record<string, any>>({})
    const selected = ref<ListItem[]>([])
    const selectedKeys = ref<(string | number)[]>([])
    const pagination = computed(() => ({
        current: params.page || 0,
        pageSize: params.pageSize || 0,
        total: total.value
    }))
    const selectedLen = computed(() => {
        return max([size(selected.value), size(selectedKeys.value)]) || 0
    })
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
                    pick(params, (config?.initConfig?.keepParamsKeys || []) as never)
                )
            }
            assign(params, arg?.params)
            const result = await config.fetch({ params: unref(params) })
            if (!isNil(result.page) && arg?.isConcat) {
                list.value = [...list.value, ...result.list] as ListItem[]
            } else {
                list.value = result.list
            }
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
        selectedKeys,
        pagination,
        selectedLen,
        resetParams,
        fetchList
    }
}
