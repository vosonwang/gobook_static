import iView from 'iview';
import i18n from './i18n'
import Vue from 'vue';
import Util from './util'

let request = {};

let vue = new Vue({
    i18n
});

/**
 *
 * @param url
 * @param method
 * @param data
 * @returns {Promise.<*>}
 */
request.fetchAsync = async (url, method, data) => {
    try {
        let header = new Headers();
        let a = Util.getCookie('Authorization');

        if (!a) {
            header.append('Authorization', a);
        }

        let response = await fetch(url, {method: method, body: JSON.stringify(data), headers: header});

        //Response 实现了 Body, 所以可用Body的json()方法
        return await response.json();
    } catch (e) {
        iView.Message.error({
            content: vue.$t('request.err'),
            duration: 2,

        });
        console.log(e)
    }
};


request.uploadImg = async (url, method, data) => {
    try {
        let response = await fetch(url, {method: method, body: data});
        return await response.json();
    } catch (e) {
        iView.Message.error({
            content: vue.$t('request.err'),
            duration: 2,

        });
        console.log(e)
    }
};

request.uploadFile = async (url, method, data, header) => {
    try {
        let response = await fetch(url, {method: method, body: data, headers: header});
        return await response.json();
    } catch (e) {
        iView.Message.error({
            content: vue.$t('request.err'),
            duration: 2,

        });
        console.log(e)
    }
};

// request.isError = (response) => {
//     switch (response.status) {
//         case 200:
//         case 201:
//         case 202:
//             return response.json();
//         default:
//             throw new Error(response.statusText)
//
//     }
// };

export default request