import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import Request from "../libs/request";
import Util from '../libs/util'
/*devtoolPlugin 和 createLogger() 2 个插件，它们是 Vuex 内置插件   链接：http://www.imooc.com/article/14741*/

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


// initial state
const state = {
    article: {},
    tocs: [],
    kind: 11,
    username: '',
    modal: false,
    titleList:[]
};

const GET_ARTICLE = 'GET_ARTICLE';
const GET_KIND = 'GET_KIND';
const GET_TOCS = 'GET_TOCS';
const GET_USER = 'GET_USER';
const GET_LOGIN = 'GET_LOGIN';
const GET_LIST = 'GET_LIST';


const mutations = {
    [GET_ARTICLE](state, article) {
        state.article = article
    },
    [GET_KIND](state, kind) {
        state.kind = kind
    },
    [GET_TOCS](state, tocs) {
        state.tocs = tocs;
    },
    [GET_USER](state, username) {
        state.username = username
    },
    [GET_LOGIN](state, bool) {
        state.modal = bool
    },
    [GET_LIST](state, list) {
        state.titleList = list
    },


};


/*1.4 为HEIGHT_CHANGE发布action   -->  1.5 index.vue*/
/*action 是为了commit mutation，只有mutation才能改变state*/
const actions = {
    getArticle({commit}, article) {
        commit(GET_ARTICLE, article)
    },
    getUser({commit}, username) {
        commit(GET_USER, username)
    },
    getKind({commit}, {kind, locale}) {
        let a;
        if (locale === 'zh_CN') {
            a = 10 + kind;
        } else {
            a = 20 + kind;
        }
        commit(GET_KIND, a);
        Request.fetchAsync('/nodes/' + a, 'GET').then(data => {
            commit(GET_TOCS, Util.combine(data));

        });
    },
    showLogin({commit}, bool) {
        commit(GET_LOGIN, bool)
    },
    getList({commit}, list) {
        commit(GET_LIST, list)
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    strict: debug,
    plugins: debug !== debug ? [createLogger()] : []
})
