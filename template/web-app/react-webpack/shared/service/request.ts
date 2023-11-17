import axios from 'axios'

const request = axios.create({
    baseURL: ENV_BASE_URL + ENV_API_HOST
})

export default request
