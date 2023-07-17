import * as homeRouter from './home'
export default {
    ...homeRouter.names,
    notFound: '404'
}
