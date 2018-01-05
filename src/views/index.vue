<style scoped lang="less">
    .list {

    }
</style>
<template>
    <Layout>
        <Header :style="{height:'123px'}">
            <Search></Search>
            <M></M>
        </Header>
        <Content>
            <Card dis-hover :style="{margin:'20px auto',width:'80%'}">
                <Row>
                    <Col span="4">
                    <Menu ref="menu" :style="{width:'auto'}" @on-select="handleSelect">
                        <Submenu v-for="(value,key) in tocs" :name="key" :key="value.id">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                {{value.title}}
                            </template>
                            <MenuItem v-for="(item,index) in value.children" :name="key+'-'+index" :key="item.id">
                                {{item.title}}
                            </MenuItem>
                        </Submenu>
                    </Menu>
                    </Col>
                    <Col span="20">
                    <div style="padding: 10px 25px;">
                        <ul class="list" v-if="ttd">
                            <li v-for="item in titleList" :key="item.id" style="margin-bottom: 50px;">
                                <h3><a href="javascript:void(0)" @click="handleClick" :id="item.id">{{item.title}}</a>
                                </h3>
                                <p>
                                    Firefox能够自动把书签、密码、历史和其他偏好设置从Chrome切换过来，你不用担心这会删除或干扰Chrome的设置。
                                </p>
                            </li>
                        </ul>
                        <!--TODO 应该设置成vue-router 直接通过路径访问 （单页应用就无法通过路径来直接访问资源了）-->
                        <div v-if="!ttd">
                            <Art></Art>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Card>
        </Content>
        <f></f>
    </Layout>
</template>
<script>
    import {mapActions, mapState} from 'vuex'
    import Search from '../component/search'
    import M from '../component/menu.vue'
    import f from '../component/footer.vue'
    import List from '../component/titleList.vue'
    import Request from '../libs/request'
    import Art from '../component/article'

    export default {
        data() {
            return {
                titleList: [],
                ttd: true,
                bbb: '',
            }
        },
        created() {
            this.getKind({"kind": 1, "locale": this.$i18n.locale});
        },
        updated: function () {
            this.$nextTick(() => {
                this.update();
            });

        },
        computed: {
            ...mapState({
                    kind: 'kind',
                    tocs: 'tocs',
                }
            ),
        },
        watch: {
            tocs: function () {
                let _self = this,
                    b = JSON.parse(JSON.stringify(_self.tocs));
                if (b.length !== 0 && b[0].children !== undefined) {
                    this.titleList = b[0].children[0].children;

                } else {
                    this.titleList = []
                }
                /*还原菜单激活项*/
                this.$refs.menu.currentActiveName = -1;
            }
        },
        components: {
            Search,
            M,
            f,
            List,
            Art
        },
        methods: {
            update() {
                /*由于是异步请求项目列表，所以会初始化一次目录，然后update一次目录*/
                let a = this.$refs.menu.$children, b = this.$refs.menu.currentActiveName;
                if (a !== []) {
                    a.forEach((item) => {
                        item.opened = true
                    });
                    if (b === -1) {
                        /*初始化菜单激活项为第一项*/
                        this.$refs.menu.currentActiveName = '0-0';
                    }
                }

            },
            handleSelect: function (name) {
                let a = name.split("-"),
                    _self = this,
                    b = JSON.parse(JSON.stringify(_self.tocs));
                this.titleList = b[a[0]].children[a[1]].children;
                this.getArticle({});
                this.ttd = true;
                this.bbb = '';
            },
            handleClick: function (a) {
                this.ttd = false;
                Request.fetchAsync('/articles/' + a.target.id, 'get').then(result => {
                    this.getArticle(result)
                });

            },
            ...mapActions(['getKind', 'getArticle'])
        }
    }
</script>
