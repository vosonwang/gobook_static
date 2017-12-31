<style scoped lang="less">

</style>
<template>
    <Layout>
        <Header :style="{height:'120px'}">
            <Search></Search>
            <M></M>
        </Header>
        <Content>
            <Card dis-hover :style="{margin:'20px auto',width:'80%'}">
                <Row>
                    <Col span="6">
                    <Menu :open-names="menuName">
                        <Submenu v-for="item in tocsTree" :name="item.id" :key="item.id">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                {{item.title}}
                            </template>
                            <MenuItem v-for="i in item.children" :name="i.id" :key="i.id">{{i.title}}</MenuItem>
                        </Submenu>
                    </Menu>
                    </Col>
                    <Col span="18">
                    2
                    </Col>
                </Row>
            </Card>
        </Content>
        <f></f>
    </Layout>
</template>
<script>
    import {mapActions, mapGetters, mapState} from 'vuex'
    import Search from '../component/search'
    import M from '../component/menu.vue'
    import f from '../component/footer.vue'


    export default {
        data(){
            return{

            }
        },
        mounted: function () {
            this.getKind({"kind": 1, "locale": this.$i18n.locale});
        },
        computed: {
            ...mapState({
                    'kind': state => state.kind,
                }
            ),
            ...mapGetters([
                'tocsTree',
                'menuName'
            ])
        },
        components: {
            Search,
            M,
            f
        },
        methods: {
            ...mapActions(['getKind'])
        }
    }
</script>
