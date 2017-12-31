<template>
    <Layout>
        <Header :style="{height:'60px'}">
            <M></M>
            <User></User>
        </Header>
        <Content>
            <Card dis-hover  :style="{margin:'20px auto',width:'60%'}">
                <Catalog></Catalog>
            </Card>
        </Content>
        <f></f>
        <login></login>
    </Layout>
</template>
<script>
    import Catalog from '../../component/tree.vue';
    import User from '../../component/user.vue'
    import M from '../../component/menu.vue'
    import Login from '../../component/login.vue'
    import f from '../../component/footer.vue'


    export default {
        components: {
            User,
            Catalog,
            M,
            Login,
            f
        },
    }
</script>
<style>

</style>