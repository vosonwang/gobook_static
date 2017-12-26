import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import common from './modules/common'
import mutations from './mutations'
import * as state from './state'
// import * as actions from './actions'
// import * as getters from './getters'
/*devtoolPlugin 和 createLogger() 2 个插件，它们是 Vuex 内置插件   链接：http://www.imooc.com/article/14741*/

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state,
    // actions,
    // getters,
    mutations,
    modules: {
        common,
    },
    strict: debug,
    plugins: debug!== debug ? [createLogger()] : []
})
