import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

/* 创建组件 */
import Login from "./com/Login.vue";
import Home from "./com/Home.vue";
import Records from "./com/home/Records.vue";
import Deposit from "./com/home/Deposit.vue";
import Receive from "./com/home/Receive";
import Index from "./com/home/Index.vue";
import Admin from "./com/home/Admin.vue";
import Person from "./com/home/Person";
import OrderDetails from "./com/home/OrderDetails.vue";
import Member from "./com/home/Member.vue";
import MemDetails from "./com/home/MemDetails.vue";

/* 配置路由 */
export default new VueRouter({
  routes: [
    { path: "/login", component: Login, name: "login" },
    {
      path: "/",
      component: Home,
      name: "home",
      redirect: "/index",
      children: [
        { path: "index", component: Index },
        { path: "deposit", component: Deposit },
        { path: "orderDetails", component: OrderDetails },
        { path: "records", component: Records },
        { path: "admin", component: Admin },
        { path: "member", component: Member },
        { path: "memDetails", component: MemDetails },
        { path: "person", component: Person },
        { path: "receive", component: Receive }
      ]
    }
  ]
});

/*  
  { path: "orderDetails", component: OrderDetails },
  { path: "orderRevise", component: OrderRevise },
  { path: "member", component: Member },
  { path: "memRevise", component: MemRevise },
  { path: "memDetails", component: MemDetails } */
