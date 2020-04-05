import request from "../utils/request";

export default {
  //校验密码
  check(name, pwd) {
    return request({
      url: "http://mengxuegu.com:7300/mock/5d6a8c22facc296cd6835190/admin/pwd",
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
      url: "http://mengxuegu.com:7300/mock/5d6a8c22facc296cd6835190/admin/pwd",
      method: "put",
      data: {
        name,
        pwd
      }
    });
  }
};
