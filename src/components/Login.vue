<template>
    <div>
            <div class="login-panel">
                <el-row type="flex" class="row-bg" justify="center" >
                    <h4 class="login-label" >登录</h4>
                </el-row>
                <el-form label-position="right" label-width="80px" :model="formData">
                    <el-form-item label="账号">
                        <el-input v-model="formData.name" placeholder="请输入账号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="formData.passwd" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <el-row type="flex" class="row-bg" justify="center">
                        <el-button type="primary" round class="login-btn" @click.prevent="handleLogin">登录</el-button>
                    </el-row>
                </el-form>
            </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    name: '',
                    passwd: '',
                }
            };
        },
        beforeCreate(){
            const token = this.$cookie.get('token');
            if (token != null){
                this.$message({
                    message: "您已登录",
                    type: 'success'
                });
                this.$router.push({path:'/rules'});
            }
        },
        methods: {
            handleLogin(){
                this.axios.post('/user/v1/login', this.formData)
                    .then((response) =>{
                        if(response.data.code == 200){
                            // 登录成功
                            this.$message({
                                message: response.data.msg,
                                type: 'success'
                            });
                            // 跳转首页
                            this.$router.push({path:"/rules"});
                            // 设置cookies
                            this.setCookie("token",response.data.data.token,response.data.data.expires_at);
                        }else {
                            this.$message.error(response.data.msg);
                        }
                    })
                    .catch( (error)=> {
                        // 登录失败
                        this.$message.error(error.response.data.msg);
                    });
            },

            // 设置cookies
           setCookie(name,value,expires_at) {
               var exp = new Date(expires_at*1000);
               document.cookie = name + "="+ escape (value) + ";expires=" + exp.toUTCString();
            },

    }
    }
</script>

<style scoped>

    .login-label{
        font-size: 1.125rem;
        font-weight: 500;
        line-height: 1.25
    }

    .login-panel{
        width: 400px;
        height: 260px;
        background-color: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -200px;
        padding: 10px 20px 0px 0px;
    }
    .login-btn{
        width: 50%;
    }

</style>