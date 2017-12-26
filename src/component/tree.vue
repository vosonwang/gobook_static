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

    span.bg {
        background-color: #f1f4f7;
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
    import {mapActions, mapState} from 'vuex'
    import moment from 'moment'

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
                        title: this.$t('tree.catalog'),
                        expand: true,
                        render: (h, {root, node, data}) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
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
                                        float: 'right',
                                        marginRight: '16px'
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
                                                this.append(data)
                                            }
                                        }
                                    }),
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'checkmark',
                                            type: 'primary',
                                        }),
                                        style: {
                                            width: '52px',
                                        },
                                        on: {
                                            click: () => {
                                                this.preserve(data)
                                            }
                                        }
                                    })
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
                    'article': state => state.common.article,
                    'tocs': state => state.common.tocs,
                    'name': state => state.common.name,
                }
            ),
            createTime: function () {
                return moment(this.article.CreateTime).utc().format('YYYY-MM-DD HH:mm:ss')
            },
            modifyTime: function () {
                return moment(this.article.ModifyTime).utc().format('YYYY-MM-DD HH:mm:ss')
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
            tocs: {
                handler: function (val, oldval) {
                    this.tree[0].children = JSON.parse(JSON.stringify(val));
                },
                immediate: true
            }
        },
        mounted: function () {
            let _self = this;
            Request.fetchAsync('/nodes/' + _self.name, 'get').then(data => {
                this.tree[0].children = data;
            });
        },
        methods: {
            renderContent(h, {root, node, data}) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    },
                    'class': {
                        bg: data.active
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
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            float: 'right',
                            marginRight: '32px',

                        },
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
                                    this.append(data)
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
            editNode(data) {
                this.nodeModal = true;
                this.data = data;
                this.nodeTitle = data.title;
            },
            ok() {
                this.data.title = this.nodeTitle;
                this.nodeModal = false;
            },
            editArticle(data) {
                this.articleModal = true;
                this.articleTitle = data.title;
                this.getId(data.id);
                let _self = this;
                Request.fetchAsync('/articles/' + data.id, 'get').then(res => {
                    _self.getArticle(res);
                });
            },
            append(data) {
                const children = data.children || [];
                const _self = this;
                Request.fetchAsync('/getId', 'get').then(result => {
                    children.push({
                        id: result,
                        title: _self.$t('tree.newNode'),
                        expand: true,
                        active: false,
                    });
                    _self.$set(data, 'children', children);
                });


            },
            remove(root, node, data) {
                if (!node.children || node.children.length === 0) {
                    const parentKey = root.find(el => el === node).parent;
                    const parent = root.find(el => el.nodeKey === parentKey).node;
                    const index = parent.children.indexOf(data);
                    parent.children.splice(index, 1);
                } else {
                    this.$Message.warning({
                        content: this.$t('tree.delNotice'),
                        duration: 2
                    })
                }

            },
            /*保存*/
            preserve(data) {
                Request.fetchAsync('/tocs', 'post', {
                    lang: this.$i18n.locale,
                    value: JSON.stringify(data.children)
                }).then(data => {
                    this.$Message.success({
                        content: this.$t('tree.success'),
                        duration: 2
                    })
                })
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
                    parent.children = parent.children.slice(0, index - 1).concat(parent.children.slice(index, index + 1), parent.children.slice(index - 1, index), parent.children.slice(index + 1, length));
                }
            },
            ...mapActions(['getId', 'getArticle', "getTocs"])

        },
    }
</script>
