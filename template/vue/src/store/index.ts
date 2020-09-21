import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 自动获取并注册views下的所有store文件, 模块名与文件名一致(.store前面的名字)
// ----------------------------------------------------------------------
const ctx = require.context('../views', true, /\.store\.ts$/)
const stores: any = {}
ctx.keys().forEach(key => {
    let fileName = key.split('/').slice(-1)[0]
    fileName = fileName.split('.')[0]
    stores[fileName] = {
        namespaced: true,
        ...ctx(key).default
    }
})

export default new Vuex.Store({
    modules: {
        app: {
            namespaced: true,
            ...require('./app').default
        },
        ...stores
    }
})
