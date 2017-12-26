<style scoped lang="less">
    .ivu-select-item {
        padding: 4px 16px;
    }
</style>
<template>
    <Select v-model="locale" @on-change="change">
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
                    'name': state => state.common.name,
                }
            ),
        },
        methods: {
            change: function (a) {
                this.$i18n.locale = a;
                this.getName({"name":this.name[1], "locale":a})
            },
            ...mapActions(['getName'])
        }
    }
</script>
