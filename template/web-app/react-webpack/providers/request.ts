import axios from 'axios'

console.log('ENV_API_HOST', ENV_API_HOST)
const request = axios.create({
    baseURL: ENV_BASE_URL + ENV_API_HOST
})

export default request
