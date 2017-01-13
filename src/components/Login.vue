<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-offset-2 col-lg-6">
                    <form class="form-horizontal">
                        <fieldset>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">帳號:</label>
                                <div class="col-lg-4"><input class="form-control" placeholder="帳號" type="email"
                                                             v-model="user.account"
                                                             required autofocus>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 control-label">密碼:</label>
                                <div class="col-lg-4"><input class="form-control" placeholder="密碼"
                                                             type="password" required
                                                             v-model="user.password">
                                </div>
                            </div>
                            <!-- Change this to a button or input when using this as a form -->
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-4">
                                    <button type="submit" class="btn btn-lg btn-success btn-block"
                                            :class="{disabled: !ready()}"
                                            @click.prevent="login">登入
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
    import baseUrl from '../baseUrl'
    import axios from 'axios'

    export default{
        data(){
            return {
                user: {
                    account: "",
                    password: ""
                }
            }
        },
        methods: {
            login(){
                const url = baseUrl() + "/authenticate"

                const resultP = axios.post(url, this.user, {
                    url: "/",
                    withCredentials: true
                })

                resultP.then(
                        (resp) => {
                            const ret = resp.data
                            if (ret.ok) {
                                const user = ret.user
                                this.$store.commit('updateAuthenticated', {authenticated: true, config:{}, user});
                                this.$router.push({name: 'Dashboard'})
                            } else {
                                alert(ret.msg)
                            }
                        }
                ).catch(
                        (err) => {
                            alert(err)
                        }
                )
            },
            ready(){
                return this.user.account && this.user.password;
            }
        },
        components: {}
    }
</script>
