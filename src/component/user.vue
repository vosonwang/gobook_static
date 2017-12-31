<template>
    <Dropdown id="user" style="margin:-85px 20px auto auto; float: right;">
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
    import {mapActions, mapState} from 'vuex'
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
        methods: {
            ...mapActions(['getUser'])
        }
    }
</script>
