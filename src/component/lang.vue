<style scoped lang="less">
    .ivu-select-item {
        padding: 4px 16px;
    }
</style>
<template>
    <Select v-model="locale" @on-change="change">
        <!--TODO bug 选择语言后提示错误-->
        <Option v-for="item in langList" :value="item.value" :key="item.value">{{item.label}}</Option>
    </Select>
</template>
<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                langList: [
                    {
                        value: 'zh_CN',
                        label: '中文'
                    },
                    {
                        value: 'en_US',
                        label: 'English_US'
                    },

                ],
                locale: 'zh_CN'
            }
        },
        computed: {
            ...mapState({
                    'kind': state => state.kind,
                }
            ),
        },
        methods: {
            change: function (a) {
                this.$i18n.locale = a;
                this.getKind({"kind":this.kind[1], "locale":a})
            },
            ...mapActions(['getKind'])
        }
    }
</script>
