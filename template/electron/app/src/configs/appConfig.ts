const isDev = process.env.ELECTRON_ENV === 'dev'
const isTest = process.env.ELECTRON_ENV === 'test'

let baseHost = './view/index.html'
if (isDev) {
    baseHost = 'http://localhost:8080'
}

export default {
    baseHost,
    isDev,
    isTest,
}
