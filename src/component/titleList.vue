<template>
    <ul>
        <li v-for="item in titleList" :key="item.id">
            <router-link :to="{ name: 'article' ,params: { id: item.id }}">
                {{item.title}}
            </router-link>
        </li>
    </ul>
</template>
<!--TODO 待删除-->
<script>
    import {mapState} from 'vuex'

    export default {
        name: "title-list",
        computed: {
            ...mapState({
                    titleList: 'titleList',
                }
            ),
        },
    }
</script>

<style scoped>

</style>