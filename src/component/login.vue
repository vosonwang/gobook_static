<template>
    <Modal id="login" v-model="loginModal" width="300" :closable="false" :mask-closable="false">
        <Form ref="loginForm" :model="loginForm" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="loginForm.username" placeholder="Username"
                       icon="ios-person-outline"></Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="loginForm.password" placeholder="Password"
                       icon="ios-locked-outline"></Input>
            </FormItem>
            <FormItem>
                <lang></lang>
            </FormItem>
            <FormItem>
                <Button type="error" size="large" long :loading="modal_loading" @click="del('loginForm')">
                    {{$t('index.login')}}
                </Button>
            </FormItem>
        </Form>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
    import Request from '../libs/request'
    import Util from '../libs/util'
    import Lang from './lang.vue'
    import {mapActions, mapState} from 'vuex'

    export default {
        name: "login",
        components: {
            Lang
        },
        data() {
            return {
                modal_loading: false,
                loginForm: {
                    username: '',
                    password: '',
                },
                ruleInline: {
                    username: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed: {
            ...mapState({
                    'loginModal': state => state.modal,
                }
            ),
        },
        mounted:function () {
            //console.log(Util.getCookie('login'))
          if(Util.getCookie('login')!=="true"){
              this.showLogin(true);
          }
        },
        methods: {
            del: function (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        let _self = this;

                        Request.fetchAsync('/tokens', 'post', _self.loginForm).then(data => {
                            if (!data) {
                                _self.modal_loading = false;
                                _self.$Message.error({
                                    content: "用户名或密码错误！",
                                    duration: 2,
                                })


                            } else {
                                _self.modal_loading = false;
                                this.showLogin(false);
                                Util.setCookie("login", true, 1);
                                this.getUser(data.username);
                                Util.setCookie("username", data.username, 1);
                                Util.setCookie("userId", data.userId, 1);
                                _self.$Message.success({
                                    content: "登录成功！",
                                    duration: 2,
                                });
                                Util.setCookie("Authorization", data.token, 1);
                            }
                        });
                    }
                })

            },
            ...mapActions(['getUser', 'showLogin'])

        }
    }
</script>

<style scoped>

</style>