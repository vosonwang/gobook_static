import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from "iview";
import Util from "./libs/util";


Vue.use(VueRouter);
Vue.use(iView);

const routers = [
    {
        path: '/',
        meta: {
            title: '首页'
        },
        name: 'home',
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: '/kb/:id',
                name:'article',
                component: (resolve) => require(['./component/article.vue'], resolve)
            }
        ]
    },
    {
        path:'/admin',
        meta:{
            title:'管理界面'
        },
        name: 'admin',
        component:(resolve) => require(['./views/admin/index.vue'], resolve),

    }
];


// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;