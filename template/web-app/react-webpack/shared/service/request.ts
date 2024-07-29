import axios from 'axios'

export const request = axios.create({
    baseURL: ENV_BASE_URL + ENV_API_HOST
})
