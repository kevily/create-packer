import axios from 'axios'

console.log('API_HOST', API_HOST)
const request = axios.create({
    baseURL: BASE_URL + API_HOST
})

export default request
