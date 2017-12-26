
<template>
    <Dropdown id="user" style="margin:10px 20px auto auto; float: right;">
        <Button type="primary">
            Voson
            <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
            <DropdownItem>{{$t('user.pw')}}</DropdownItem>
        </DropdownMenu>
    </Dropdown>
</template>
<script>
    export default {

    }
</script>
<style>
    #user .ivu-select-dropdown{
        z-index: 1000;
    }
</style>
