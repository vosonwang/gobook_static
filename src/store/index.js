import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as types from "./mutation-types";
import Request from "../libs/request";
/*devtoolPlugin 和 createLogger() 2 个插件，它们是 Vuex 内置插件   链接：http://www.imooc.com/article/14741*/

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// initial state
const state = {
    id: '',
    article: {},
    tocs: [],
    kind: 11,
    username:''
};


const mutations = {
    [types.GET_ID](state, id) {
        state.id = id
    },
    [types.GET_ARTICLE](state, article) {
        state.article = article
    },
    [types.GET_Kind](state, kind) {
        state.kind = kind
    },
    [types.GET_Tocs](state, tocs) {
        state.tocs = tocs
    },
    [types.GET_User](state, username) {
        state.username = username
    }

};


/*1.4 为HEIGHT_CHANGE发布action   -->  1.5 index.vue*/
/*action 是为了commit mutation，只有mutation才能改变state*/
const actions = {
    getId({commit}, id) {
        commit(types.GET_ID, id)
    },
    getArticle({commit}, article) {
        commit(types.GET_ARTICLE, article)
    },
    getUser({commit}, username) {
        commit(types.GET_User, username)
    },
    getKind({commit}, {kind, locale}) {
        let a;
        if (locale === 'zh_CN') {
            a = 10 + kind;
        } else {
            a = 20 + kind;
        }
        commit(types.GET_Kind, a);
        Request.fetchAsync('/nodes/' + a, 'GET').then(data => {
            commit(types.GET_Tocs, data);
        });
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    strict: debug,
    plugins: debug!== debug ? [createLogger()] : []
})
