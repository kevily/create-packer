import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_API_HOST
})

export default request
