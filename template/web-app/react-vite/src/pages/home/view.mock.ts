import { faker } from '@faker-js/faker'
import { API } from '@/service'
import { defineMock } from '@/mockUtils'

export default defineMock([
    {
        url: API.HOME_DATA,
        body: faker.helpers.multiple(
            () => ({
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                age: faker.number.int({ max: 110 })
            }),
            {
                count: 10
            }
        )
    }
])
