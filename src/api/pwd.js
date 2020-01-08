import request from "../utils/request";

export default {
  //校验密码
  check(name, pwd) {
    return request({
      url: "/admin/pwd",
      method: "post",
      data: {
        name,
        pwd
      }
    });
  },

  //修改密码
  update(name, pwd) {
    return request({
      url: "/admin/pwd",
      method: "put",
      data: {
        name,
        pwd
      }
    });
  }
};
