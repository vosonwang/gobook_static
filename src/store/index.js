import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import Request from "../libs/request";
import Util from '../libs/util'
/*devtoolPlugin 和 createLogger() 2 个插件，它们是 Vuex 内置插件   链接：http://www.imooc.com/article/14741*/

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const GET_ARTICLE = 'GET_ARTICLE';
const GET_Kind = 'GET_Kind';
const GET_Tocs = 'GET_Tocs';
const GET_User = 'GET_User';
const GET_Login = 'GET_Login';

// initial state
const state = {
    article: {},
    tocs: [],
    kind: 11,
    username: '',
    modal: false,
};

//getters
const getters = {
    tocsTree: state => {
        return Util.combine(state.tocs)
    },
    menuName: (state, getters) => {
        let a = [];
        getters.tocsTree.forEach(function (v) {
            a.push(v.id)
        });
        return a
    }
};

const mutations = {
    [GET_ARTICLE](state, article) {
        state.article = article
    },
    [GET_Kind](state, kind) {
        state.kind = kind
    },
    [GET_Tocs](state, tocs) {
        state.tocs = tocs;
    },
    [GET_User](state, username) {
        state.username = username
    },
    [GET_Login](state, bool) {
        state.modal = bool
    },

};


/*1.4 为HEIGHT_CHANGE发布action   -->  1.5 index.vue*/
/*action 是为了commit mutation，只有mutation才能改变state*/
const actions = {
    getArticle({commit}, article) {
        commit(GET_ARTICLE, article)
    },
    getUser({commit}, username) {
        commit(GET_User, username)
    },
    getKind({commit}, {kind, locale}) {
        let a;
        if (locale === 'zh_CN') {
            a = 10 + kind;
        } else {
            a = 20 + kind;
        }
        commit(GET_Kind, a);
        Request.fetchAsync('/nodes/' + a, 'GET').then(data => {
            commit(GET_Tocs, data);
        });
    },
    showLogin({commit}, bool) {
        commit(GET_Login, bool)
    }
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    strict: debug,
    plugins: debug !== debug ? [createLogger()] : []
})
