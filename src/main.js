import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router/router";
import '@/assets/css/reset.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'


Vue.use(VueAxios, axios)
Vue.use(ElementUI);
Vue.use(VueCookie);

axios.defaults.baseURL='http://47.104.0.136:8080';
Vue.config.productionTip = false


/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
