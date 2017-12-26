import * as types from '../mutation-types'
import Request from '../../libs/request'

// initial state
const state = {
    id: '',
    article: {},
    tocs: [],
    name: '11'
};

const mutations = {
    [types.GET_ID](state, id) {
        state.id = id
    },
    [types.GET_ARTICLE](state, article) {
        state.article = article
    },
    [types.GET_Name](state, name) {
        state.name = name
    },
    [types.GET_Tocs](state, tocs) {
        state.tocs = tocs
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
    getName({commit}, {name, locale}) {
        let a;
        if (locale === 'zh_CN') {
            a = "1" + name;
        } else {
            a = "2" + name;
        }
        commit(types.GET_Name, a);
        Request.fetchAsync('/nodes/' + a, 'get').then(data => {
            commit(types.GET_Tocs, data);
        });
    }
};

export default {
    state,
    actions,
    mutations
}