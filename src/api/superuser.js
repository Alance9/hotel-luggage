import request from "../utils/request";

export default {
  //获取行李员列表
  // 分页搜索方法
  // page 当前页码, size每页查询条数, map条件查询的条件值
  search(page, size, map) {
    return request({
      url: `/member/list/search/${page}/${size}`,
      method: "post",
      data: map
    });
  }
};
