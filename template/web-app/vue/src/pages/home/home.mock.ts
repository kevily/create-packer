import Mock from 'mockjs'
import { defineMock } from '@/mockUtils'
import { API } from './providers'
export default defineMock([
    {
        url: API.HOME_DATA,
        body: Mock.mock({
            'data|10': [
                {
                    name: '@string',
                    age: '@natural'
                }
            ]
        })
    }
])
