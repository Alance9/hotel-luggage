import request from "../utils/request";

export default {
  //获取统计数据
  getList() {
    return request({
      url: "/index/list",
      method: "get"
    });
  }
};
