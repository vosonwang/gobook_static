
<template>
    <Dropdown id="user" style="margin:10px 20px auto auto; float: right;">
        <Button type="primary">
            {{username}}
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem>{{$t('user.pw')}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>
<script>
    import {mapState,mapActions} from 'vuex'
    import Util from '../libs/util'
    export default {
        computed: {
            ...mapState({
                    'username': state => state.username,
                }
            ),
        },
        mounted: function () {
            this.getUser(Util.getCookie('username'))
        },
        methods:{
            ...mapActions(['getUser'])
        }
    }
</script>
<style>
    #user .ivu-select-dropdown{
        z-index: 1000;
    }
</style>
