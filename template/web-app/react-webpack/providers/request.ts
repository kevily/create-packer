import axios from 'axios'

console.log('__API_HOST__', __API_HOST__)
const request = axios.create({
    baseURL: __BASE_URL__ + __API_HOST__
})

export default request
