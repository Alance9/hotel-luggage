import request from "../utils/request";

export default {
  //获取统计数据
  getList() {
    return request({
      url: "http://mengxuegu.com:7300/mock/5e9908d02a2f716419f88cae/index/list",
      method: "get"
    });
  }
};
