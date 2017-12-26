import Vue from 'vue'
import I18n from 'vue-i18n';
import Formatter from './formatter'
import en_Us from 'iview/dist/locale/en-US';
import zh_CN from 'iview/dist/locale/zh-CN';


Vue.use(I18n);

let messages = {
    'zh-CN': {
        index:{
            login:'登录',
        },
        admin: {
            preview: '预览'
        },
        search: {
            placeholder: '输入标题或者内容...'
        },
        tree: {
            delNotice: '该节点含有子节点无法删除！',
            success: '保存成功！',
            modTitle: '编辑节点',
            catalog: '目录',
            created: '创建时间：',
            updated: '更新时间：',
            newNode: '新节点'
        },
        editor: {
            artSuccess: '文章保存成功！'
        },
        request: {
            err: '哪里出问题了，请联系管理员！',
        },
        user: {
            pw: '修改密码'
        },
        communities:{
            organizer:'主办方',
            exhibitor:'展商',
            visitor:'观众',
            supplier:'供应商'
        }
    },
    'en-US': {
        index:{
            login:'Login',
        },
        admin: {
            preview: 'Preview'
        },
        search: {
            placeholder: 'Input title or content...'
        },
        tree: {
            delNotice: 'This node has child,so can not delete！',
            success: 'Saved！',
            modTitle: 'Edit Node',
            catalog: 'Catalog',
            created: 'Created：',
            updated: 'Updated：',
            newNode: 'New Node'
        },
        editor: {
            artSuccess: 'Article Saved！'
        },
        request: {
            err: 'Oh!Something wrong，contact with the admin！',
        },
        user: {
            pw: 'Change Password'
        },
        communities:{
            organizer:'Organizer',
            exhibitor:'Exhibitor',
            visitor:'Visitor',
            supplier:'Supplier'
        }
    }
};

messages = {
    /*让ivew也随之切换语言，比如Modal封装的确定、取消按钮要切换成英文的*/
    en_US: Object.assign(messages['en-US'], en_Us),
    zh_CN: Object.assign(messages['zh-CN'], zh_CN)
};

Vue.locale = () => {
};

const locale = 'zh_CN';

const formatter = new Formatter({locale});

// Create I18n instance with options
const i18n = new I18n({
    locale: locale,
    formatter,
    messages
});


export default i18n
