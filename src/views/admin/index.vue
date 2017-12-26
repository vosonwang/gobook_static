<style scoped lang="less">
    .warp {
        .header {
            background-color: #49505F;
            height: 55px;
        }

        .preview {
            float: right;
        }
    }
</style>
<template>
    <div class="warp">
        <Row class="header">
            <Col span="2" offset="22">
            <User></User>
            </Col>
        </Row>
        <Row>
            <Col>
            <M></M>
            </Col>
        </Row>
        <Row>
            <Col span="16" offset="4">
            <Card>

                <!--<router-link :to="{ name: 'home'}"-->
                             <!--active-class="preview ivu-btn ivu-btn-ghost ivu-btn-ghost ivu-btn-small">-->
                    <!--{{$t('admin.preview')}}-->
                <!--</router-link>-->
                <Catalog></Catalog>
            </Card>
            </Col>
        </Row>
        <login></login>
    </div>
</template>
<script>
    import Catalog from '../../component/tree.vue';
    import User from '../../component/user.vue'
    import M from '../../component/menu.vue'
    import Login from '../../component/login.vue'

    export default {
        components: {
            User,
            Catalog,
            M,
            Login
        }
    }
</script>