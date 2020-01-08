/* 权限校验 
    vue router 前置钩子函数
    路由跳转前进行判断
    记得在main.js中导入
*/
import router from "./router";
import { getAdminInfo } from "./api/login";

//to ,即将进入的目标路由对象
//from ,即将要离开的路由对象
//next ,是一个方法，可以指定路由地址，进行路由跳转
router.beforeEach((to, form, next) => {
  //获取token
  const token = localStorage.getItem("myview-token");
  //没有token
  if (!token) {
    //如果访问其他页面，则跳转login
    if (to.path != "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    //有token ，仍然访问login页面
    if (to.path === "/login") {
      next();
    } else {
      //有token ，而且有用户信息
      const user = localStorage.getItem("myview-user");
      if (user) {
        next();
      } else {
        getAdminInfo(token).then(Response => {
          const resp = Response.data;
          //没有用户信息，则获取保存
          if (resp.flag) {
            localStorage.setItem("myview-user", JSON.stringify(resp.data));
            next();
          } else {
            //未获取，则重新登录
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
