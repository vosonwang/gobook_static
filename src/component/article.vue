<template>
    <div>
        <h1>{{article.title}}</h1>
        <p>{{$t('tree.created')}}{{createTime}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{$t('tree.updated')}}{{modifyTime}}</p>
        <mavon-editor default_open="preview" :value=this.article.text :ishljs="false" :toolbarsFlag="false"
                      :subfield="false"></mavon-editor>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import moment from 'moment'

    export default {
        data() {
            return {
                tip: '22'
            }
        },
        components: {
            mavonEditor
        },
        computed: {
            /*TODO 应该设为全局变量*/
            createTime: function () {
                return moment(this.article.created).utc().format('YYYY-MM-DD HH:mm:ss')
            },
            modifyTime: function () {
                return moment(this.article.updated).utc().format('YYYY-MM-DD HH:mm:ss')
            },
            ...mapState({
                    article: 'article',
                }
            ),

        },
    }
</script>
<style>
    .v-note-wrapper .v-note-panel .v-note-show div.v-show-content {
        background: white;
    }
    div.v-note-wrapper {
        z-index: 900;
    }
</style>