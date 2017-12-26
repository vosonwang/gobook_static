<style>

    .v-note-wrapper div.v-note-panel {
        box-shadow: none;
        border-top: 1px solid #E9EAEC
    }

    .v-note-wrapper div.v-note-op {
        box-shadow: none;
    }


</style>
<template>
    <div>
        <mavon-editor default_open="edit" @subfieldtoggle="subfieldCallback" :value=this.article.value
                      :toolbars=this.toolbars :ishljs="false" @save="saveArticle" @imgAdd="imgAdd"
                      placeholder="写点什么..." ref=md></mavon-editor>

        <div class="ivu-upload ivu-upload-select" ref="diy">
            <input type="file" class="ivu-upload-input" ref="input" @change="getFile">
            <button type="button" class="op-icon fa " aria-hidden="true" title="上传附件" style="margin-left: 3px;"
                    @click="upload">
                <Icon type="arrow-up-a"></Icon>
            </button>
        </div>

    </div>


</template>
<script>
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import {mapState, mapActions} from 'vuex'
    import Request from '../libs/request'
    import moment from 'moment'
    import utf8 from 'utf8'

    export default {
        data() {
            return {
                toolbars: {
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    strikethrough: true, // 中划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    subscript: true, // 下角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    link: true, // 链接
                    imagelink: false, // 图片链接
                    code: true, // code
                    table: true, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    htmlcode: true, // 展示html源码
                    help: true, // 帮助
                    /* 1.3.5 */
                    undo: true, // 上一步
                    redo: true, // 下一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）

                    /* 1.4.2 */
                    navigation: true, // 导航目录
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    subfield: true, // 单双栏模式
                    preview: true, // 预览
                },
            }
        },
        components: {
            mavonEditor
        },
        mounted() {
            /*默认显示的是全屏编辑，所以双栏模式设置需手动设置为false*/
            this.$children[0].s_subfield = false;

            let md = this.$refs.md;
            let toolbar_left = md.$refs.toolbar_left;
            let diy = this.$refs.diy;
            toolbar_left.$el.append(diy);


        },
        computed: {
            ...mapState({
                    'id': state => state.common.id,
                    'article': state => state.common.article,
                }
            )
        },
        methods: {
            /*点击双栏模式的回调函数*/
            subfieldCallback: function () {
                /*在点击双栏模式后，迫使预览模式的值和双栏模式保持一致*/
                this.$children[0].s_preview_switch = this.$children[0].s_subfield
            },
            saveArticle: function () {
                let _self = this;
                let a = this.$children[0].d_value;

                Request.fetchAsync('/articles', 'post', {
                    "id": this.id,
                    "value": a,
                    "html": this.$children[0].d_render
                }).then(data => {
                    Request.fetchAsync('/articles/' + _self.id, 'get').then(res => {
                        _self.getArticle(res);
                    });

                    this.$Message.success({
                        content: this.$t('editor.artSuccess'),
                        duration: 2
                    });

                    console.log(data)
                });
            },
            imgAdd: function (filename, imgFile) {
                Request.uploadImg('/images', 'post', imgFile).then(data =>
                    this.$refs.md.$img2Url(filename, data)
                )
            },
            upload() {
                this.$refs.input.click();
            },
            getFile: function (e) {

                let header = new Headers();

                /*获取要上传文件*/
                let a = e.target.files[0];

                header.append('id', utf8.encode(a.name));

                Request.uploadFile('/files', 'post', a, header).then(data => {
                        /*清空上传文件，以便同一文件可以多次上传，否则同一个文件不会触发change事件*/
                        e.target.value = null;

                        /*在光标处插入上传的文件链接*/
                        this.$refs.md.insertText(this.$refs.md.getTextareaDom(),
                            {
                                prefix: '\n[' + a.name + '](' +data + ')',
                                subfix: '',
                                str: ''
                            })

                    }
                );
            },
            ...mapActions(['getArticle'])
        }
    }
</script>