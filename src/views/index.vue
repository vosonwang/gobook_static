<style scoped lang="less">
    .warp {
        .header {
            background-color: #49505F;
            height: 55px;
            margin-bottom: 20px;
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
    </div>
</template>
<script>
    import Search from '../component/search'
    export default {
        data () {
            return {
                value13: '',
            }
        },
        components: {
            Search,
        },
        methods: {

        }
    }
</script>
