<template>
    <Menu mode="horizontal" active-name="1" @on-select="getN" :style="{zIndex:0}">
        <div class="layout-assistant">
            <MenuItem v-for="item in menu" :name="item.name" :key="item.name" >{{item.label}}</MenuItem>
        </div>
    </Menu>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "menu",
        computed:{
          menu:function () {
              if(this.$i18n.locale==='zh_CN'){
                  return [
                      {
                          name: '1',
                          label: '主办方'
                      },
                      {
                          name: '2',
                          label: '展商'
                      },
                      {
                          name: '3',
                          label: '观众'
                      },
                      {
                          name: '4',
                          label: '供应商'
                      },
                  ]
              }else {
                  return [
                      {
                          name: '1',
                          label: 'Organizer'
                      },
                      {
                          name: '2',
                          label: 'Exhibitor'
                      },
                      {
                          name: '3',
                          label: 'Visitor'
                      },
                      {
                          name: '4',
                          label: 'Supplier'
                      },
                  ]
              }
          }
        },
        methods:{
            getN:function (name) {
                this.getArticle({});
                this.getKind({"kind":parseInt(name),"locale":this.$i18n.locale})

            },
            ...mapActions(['getKind', 'getArticle'])
        }
    }
</script>

<style scoped lang="less">
    .layout-assistant{
        width: 400px;
        margin: 0 auto;
        height: inherit;

    }

    .ivu-menu-horizontal{
        margin-bottom: 20px;
    }
</style>