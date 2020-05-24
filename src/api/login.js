import request from "../utils/request";

export function login(userloginname, password) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/userLogin", //'/user/userLogin', //"/admin/login",
    method: "post",
    data: {
      userloginname,
      password
    }
  });
}

// export function logout(token) {
//   return request({
//     url: "/admin/logout",
//     method: "post",
//     data: {
//       token
//     }
//   });
// }

export function loginout(userloginname) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/userloginout",
    method: "post",
    data: {
      userloginname
    }
  });
}

// export function getAdminInfo(token) {
//   return request({
//     url: `/admin/info/${token}`,
//     method: "get"
//   });
// }

export function getUserInfo(token) {
  return request({
    url: `http://luggage.gz2vip.idcfengye.com/user/getdata`,
    method: "post",
    params: {
      token: token
    },
    // header: {
    //   // 已经在request.js里面进行全局设置，也可以在请求里面局部设置其他headers
    //   "Content-Type": "application/x-www-form-urlencoded"
    // }
  });
}

export function newPass(form) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/updatepassword",
    method: "post",
    data: form
  });
}