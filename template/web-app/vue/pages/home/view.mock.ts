import { faker } from '@faker-js/faker'
import { defineMock } from '@/mockUtils'
import { API } from '@/shared/service'

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
