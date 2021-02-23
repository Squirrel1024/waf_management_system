<template >
    <el-container class="container">
        <el-aside width="200px" style="background-color:#304156; height: 100vh;overflow-x: hidden" >

            <el-menu
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                    background-color="#304156"
                    text-color="#bfc8d9"
                    active-text-color="#f4f4f5"
                    router
                    style="width: 200px">
                <h3 class="aside-title" >WAF后台管理系统</h3>
                <el-menu-item index="/rules">
                    <i class="el-icon-s-grid"></i>
                    <span slot="title">规则管理</span>
                </el-menu-item>
                <el-menu-item index="/logs">
                    <i class="el-icon-document"></i>
                    <span slot="title" >日志查看</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container class="container">
            <el-header class="header">
                <div class="header-nav">
                    <div class="right-menu">
                            <el-tooltip content="启动WAF" effect="dark" placement="bottom">
                                <el-button type="text" icon="el-icon-video-play" class="WAF-button" style="font-size: 25px" circle @click="openWAF"></el-button>
                            </el-tooltip>
                            <el-tooltip content="重启WAF" effect="dark" placement="bottom">
                                <el-button type="text" icon="el-icon-refresh-left" class="WAF-button" style="font-size: 25px" circle @click="refreshWAF"></el-button>
                            </el-tooltip>
                            <el-tooltip content="关闭WAF" effect="dark" placement="bottom">
                                <el-button type="text" icon="el-icon-switch-button" class="WAF-button" style="font-size: 25px" circle @click="closeWAF"></el-button>
                            </el-tooltip>
                            <el-tooltip content="退出登录" effect="dark" placement="bottom">
                                <el-button type="text" icon="el-icon-circle-close" style="font-size: 25px;margin-left: 1px" circle @click="signOut"></el-button>
                            </el-tooltip>
                    </div>
                </div>
            </el-header>
            <el-main class="main"><router-view></router-view></el-main>
        </el-container>
    </el-container>


</template>

<script>
    export default {
        name: "Home",
        beforeCreate(){
            const token = this.$cookie.get('token');
            if (token == null){
                this.$message.error("您还未登录");
                this.$router.push({path:'/login'});
            }
        },
        methods:{
            signOut(){
                this.clearCookie("token");
                this.$message({
                    message: "退出登录成功",
                    type: 'success'
                });
                this.$router.push({path:"/login"});
            },
            // 删除cookie
            clearCookie(name) {
                this.setCookie(name, "", -1);
            },
            // 设置cookie
            setCookie(name,value,expires_at) {
                var exp = new Date(expires_at*1000);
                document.cookie = name + "="+ escape (value) + ";expires=" + exp.toUTCString();
            },
            openWAF(){
                this.axios.get('/waf/v1/start')
                    .then((response) =>{
                        if(response.status == 200){
                            // 打开成功
                            this.$message({
                                message: "WAF打开成功",
                                type: 'success'
                            });
                        }
                    })
                    .catch( (error)=> {
                        // 打开失败
                        if (error.response.status == 400){
                            this.$message.error("WAF打开失败: "+error.response.data.message);
                        }else{
                            console.log(error);
                            this.$message.error("WAF打开失败");
                        }
                    });
            },
            closeWAF(){
                this.axios.get('/waf/v1/stop')
                    .then((response) =>{
                        if(response.status == 200){
                            // 关闭成功
                            this.$message({
                                message: "WAF关闭成功",
                                type: 'success'
                            });
                        }
                    })
                    .catch( (error)=> {
                        // 关闭失败
                        if (error.response.status == 400){
                            this.$message.error("WAF关闭失败: "+error.response.data.message);
                        }else{
                            console.log(error);
                            this.$message.error("WAF关闭失败");
                        }
                    });
            },
            refreshWAF(){
                this.axios.get('/waf/v1/restart')
                    .then((response) =>{
                        if(response.status == 200){
                            // 重启成功
                            this.$message({
                                message: "WAF重启成功",
                                type: 'success'
                            });
                        }
                    })
                    .catch( (error)=> {
                        // 重启失败
                        if (error.response.status == 400){
                            this.$message.error("WAF重启失败: "+error.response.data.message);
                        }else{
                            console.log(error);
                            this.$message.error("WAF重启失败");
                        }
                    });
            }

        }

    }
</script>

<style scoped>
    .header-nav {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;
    }

    .WAF-button{
        padding: 0px;
    }

    .aside-title{
        color:#BFC8D9;
        font-size: 14px;
        padding: 0 20px;
        transition: border-color .3s,background-color .3s,color .3s;
        box-sizing: border-box;

        height: 56px;
        line-height: 50px;
        position: relative;
        -webkit-box-sizing: border-box;
        white-space: nowrap;
        list-style: none;
        margin: 0px;
        text-align: center;
    }

    .container{
        height: 100%;
    }

    .header{
        padding: 0px;
        height: 50px !important;
    }

    .main{
        height: 92vh;
    }


</style>