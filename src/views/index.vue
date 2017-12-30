<style scoped lang="less">
    .warp {
        .header {
            background-color: #49505F;
            height: 55px;
        }

    }
</style>
<template>
    <div class="warp">
        <Row class="header">
            <Col span="10" offset="7">
            <Search></Search>
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

            </Card>
            </Col>
        </Row>

    </div>
</template>
<script>
    import Search from '../component/search'
    import M from '../component/menu.vue'

    export default {
        data() {
            return {
                value13: '',

            }
        },
        components: {
            Search,
            M
        },
        methods: {}
    }
</script>
