import axios from 'axios'

export const request = axios.create({
    baseURL: import.meta.env.PUBLIC_BASE_URL + import.meta.env.PUBLIC_API_HOST
})
