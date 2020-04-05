import request from "../utils/request";

export default {
  //获取统计数据
  getList() {
    return request({
      url: "http://mengxuegu.com:7300/mock/5d6a8c22facc296cd6835190/index/list",
      method: "get"
    });
  }
};
