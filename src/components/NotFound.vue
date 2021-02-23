<template>
    <div>
        <h1 class="mainWord">404 Not Found</h1>
        <h5 class="subWord">链接指向的网页不存在</h5>
        <div class="returnButton">
            <el-button type="primary" @click="returnToMain">返回主页</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
        methods:{
            returnToMain(){
                this.$router.push("/rules");
            }
        }
    }
</script>

<style scoped>
    .mainWord{
        text-align: center;
        font-size: 2rem;
        font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        font-weight: 600;
        line-height: 1.25;
    }
    .subWord{
        margin-block-start: 1.0rem;
        margin-block-end: 1.0rem;
        text-align: center;
        font-size: 1.0625rem;
        font-family: Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        font-weight: 500;
        line-height: 1.25;
    }
    .returnButton{
        margin-top: 25px;
        text-align: center;
    }
</style>