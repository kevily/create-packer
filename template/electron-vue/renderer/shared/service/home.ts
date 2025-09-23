import { request } from './request'
import { HOME_DATA } from './api'

export async function fetchHomeData() {
    const { data } = await request(HOME_DATA)
    return data
}
