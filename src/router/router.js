import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Log from "@/components/Log";
import Rule from "@/components/Rule";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/login',
            component:Login,
            meta:{
                title:'登录 | WAF后台管理系统'
            }
        },
        {
            path: '/',
            component: Home,
            meta:{
                title:'WAF后台管理系统'
            },
            children: [
                {
                    path: '/rules',
                    component: Rule,
                    meta:{
                        title:'规则管理 | WAF后台管理系统'
                    }
                },
                {
                    path: '/logs',
                    component: Log,
                    meta:{
                        title: '日志查看 | WAF后台管理系统'
                    }
                }
            ]
        },
        {   path: '*',
            component: NotFound,
            meta:{
                title:'404 Not Found | WAF后台管理系统'
            }
        }
    ],
})