<style>
    .ivu-tree li {
        font-size: 16px;
    }

    .ivu-tree li ul {
        font-size: 16px;
    }

    span.hide {
        display: none;
    }


    #editor .ivu-modal-body {
        padding: 0;
    }
</style>
<template>
    <div>
        <Tree :data="tree" :render="renderContent"></Tree>
        <Modal v-model="nodeModal" @on-ok="ok">
            <Input v-model="nodeTitle" @on-enter="ok"></Input>
        </Modal>
        <Modal v-model="articleModal" width="1100" :title="articleTitle" id="editor">
            <Mavon></Mavon>
            <div slot="footer">
                {{$t('tree.created')}}{{createTime}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {{$t('tree.updated')}}{{modifyTime}}
            </div>
        </Modal>
    </div>
</template>
<script>
    import Request from '../libs/request'
    import Mavon from './editor.vue';
    import {mapActions, mapGetters, mapState} from 'vuex'
    import moment from 'moment'
    import Util from '../libs/util'

    export default {
        data() {
            return {
                nodeModal: false,
                nodeTitle: this.$t('tree.modTitle'),

                articleModal: false,
                articleTitle: "",

                data: {}, //节点的数据
                tree: [
                    {
                        id: "00000000-0000-0000-0000-000000000000",
                        title: this.$t('tree.catalog'),
                        expand: true,
                        render: (h, {root, node, data}) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%',
                                    height: '20px'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        width: '93%',
                                        textAlign: 'right',
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'plus',
                                            type: 'primary'
                                        }),
                                        style: {
                                            width: '52px',
                                            marginRight: '8px'
                                        },
                                        on: {
                                            click: () => {
                                                this.append(node, data)
                                            }
                                        }
                                    }),
                                ])
                            ]);
                        },
                        children: []

                    }
                ],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                },

            }
        },
        components: {
            Mavon,
        },
        computed: {
            ...mapState({
                    'article': state => state.article,
                    'kind': state => state.kind,
                }
            ),
            ...mapGetters([
                'tocsTree',
            ]),
            createTime: function () {
                return moment(this.article.created).utc().format('YYYY-MM-DD HH:mm:ss')
            },
            modifyTime: function () {
                return moment(this.article.updated).utc().format('YYYY-MM-DD HH:mm:ss')
            },
            local: function () {
                /*根据语言的变化触发local的watch*/
                return this.$i18n.locale
            },
        },
        watch: {
            local: {
                handler: function (val, oldVal) {
                    let _self = this;
                    /*watch触发，修改主目录名和目录内容*/
                    this.tree[0].title = this.$t('tree.catalog');
                },
                immediate: true
            },
            tocsTree: {
                handler: function (val, oldval) {
                    /*一旦全局tocs变化，则更新目录*/
                    this.tree[0].children = JSON.parse(JSON.stringify(val));
                },
                immediate: true
            }
        },
        mounted: function () {
            Request.fetchAsync('/nodes/' + this.kind, 'get').then(data => {
                this.tree[0].children = JSON.parse(JSON.stringify(Util.combine(data)))
            });
        },
        methods: {
            renderContent(h, {root, node, data}) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                        height: '26px',
                    },
                    on: {
                        /*鼠标经过显示按钮*/
                        mouseover: () => {
                            data.active = true;
                        },
                        /*鼠标移走隐藏按钮*/
                        mouseout: () => {
                            data.active = false;
                        }
                    },
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: '10%',
                            }
                        },data.title)
                    ]),
                    h('span', {
                        'class': {
                            hide: !data.active
                        }
                    }, [
                        h('Button', {
                            /*将全局buttonProps和{icon:''}拼在一起给到props*/
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'android-create',
                            }),
                            style: {
                                marginRight: '8px',

                            },

                            on: {
                                click: () => {
                                    this.editNode(data)
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px',

                            },
                            on: {
                                click: () => {
                                    this.append(node, data)
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            style: {
                                marginRight: '8px',

                            },

                            on: {
                                click: () => {
                                    this.remove(root, node, data)
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-arrow-up'
                            }),
                            style: {
                                marginRight: '8px',

                            },
                            on: {
                                click: () => {
                                    this.upward(root, node, data)
                                }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-compose-outline',
                            }),
                            style: {},
                            on: {
                                click: () => {
                                    this.editArticle(data)
                                }
                            }
                        })
                    ])
                ]);
            },
            /*
            * arrObj 必须是数组对象，且不能为空
            * 将一纬度数组对象转换为无限层级的Tree形数组对象
            * */


            editNode(data) {
                /*TODO 首先要询问是否有人在编辑*/
                this.nodeModal = true;
                /*打开节点编辑模态框*/
                this.data = data;
                this.nodeTitle = data.title;
            },
            ok() {
                let _self = this;
                Request.fetchAsync('/admin/nodes/' + _self.data.id, 'patch', {"title": _self.nodeTitle}).then(result => {
                    _self.data.title = this.nodeTitle;
                    /*关闭节点编辑模态框*/
                    _self.nodeModal = false;
                });

            },
            editArticle(data) {
                /*TODO 首先要询问是否有人在编辑*/
                this.articleModal = true;
                this.articleTitle = data.title;
                let _self = this;
                Request.fetchAsync('/articles/' + data.id, 'get').then(result => {
                    _self.getArticle(result);
                });
            },
            append(node, data) {
                const children = data.children || [];
                const _self = this;
                let record = {
                    title: _self.$t('tree.newNode'),
                    expand: true,
                    active: false,
                    parent_id: node.node.id,
                    kind: _self.kind
                };

                Request.fetchAsync('/admin/nodes', 'POST', record).then(result => {
                    record.id = result;
                    children.push(record);
                    _self.$set(data, 'children', children);
                });


            },
            remove(root, node, data) {
                if (!node.children || node.children.length === 0) {
                    const parentKey = root.find(el => el === node).parent;
                    const parent = root.find(el => el.nodeKey === parentKey).node;
                    const index = parent.children.indexOf(data);
                    Request.fetchAsync('/admin/nodes/' + data.id, 'delete').then(result => {
                        parent.children.splice(index, 1);
                    });

                } else {
                    this.$Message.warning({
                        content: this.$t('tree.delNotice'),
                        duration: 2
                    })
                }

            },
            /*向上移动一位*/
            upward(root, node, data) {
                /*移除选中状态*/
                data.active = false;

                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                const length = parent.children.length;
                if (index !== 0) {

                    Request.fetchAsync('/admin/nodekey/' + data.id, 'patch',
                        {"id": parent.children[index - 1].id}
                    ).then(result => {
                        parent.children = parent.children.slice(0, index - 1).concat(
                            parent.children.slice(index, index + 1),
                            parent.children.slice(index - 1, index),
                            parent.children.slice(index + 1, length)
                        );
                    });


                }
            },
            ...mapActions(['getArticle',])

        },
    }
</script>
