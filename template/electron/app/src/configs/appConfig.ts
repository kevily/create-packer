let baseHost = './view/index.html'
if (process.env.NODE_ENV === 'development') {
    baseHost = 'http://localhost:8080'
}

export default {
    baseHost
}
