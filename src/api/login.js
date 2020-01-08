import request from "../utils/request";

export function login(userloginname, password) {
  return request({
    url: "/admin/login", //'/user/userLogin',
    method: "post",
    data: {
      userloginname,
      password
    }
  });
}

export function logout(token) {
  return request({
    url: "/admin/logout",
    method: "post",
    data: {
      token
    }
  });
}

export function getAdminInfo(token) {
  return request({
    url: `/admin/info/${token}`,
    method: "get"
  });
}
