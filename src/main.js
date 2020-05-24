import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./utils/store"; //vuex
// import 'babel-polyfill';

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import VCharts from "v-charts";
Vue.use(VCharts);

// 权限拦截
import "./permission";
//自适应
// import "lib-flexible/flexible";

// 上线需要
/* Vue.config.productionTip = process.env.NODE_ENV === "production";
console.log(process.env.VUE_APP_SERVICE_URL); */


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");