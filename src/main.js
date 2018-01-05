import Vue from 'vue';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import store from './store'
import i18n from './libs/i18n'
import router from './router'



new Vue({
    el: '#app',
    store,
    i18n,
    router: router,
    render: h => h(App)
});
