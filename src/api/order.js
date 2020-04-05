import request from "../utils/request";


export function add(depList) {
  return request({
    url: "/luggage/neworderFromWeb", //"/order/add" /* '/luggage/neworder' */,
    method: "post",
    data: depList,
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
}

export default {
  //添加订单
  add(depList) {
    return request({
      url: "/luggage/neworderFromWeb", //"/order/add" /* '/luggage/neworder' */,
      method: "post",
      data: depList,
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    });
  },

  //获取订单列表
  getList() {
    return request({
      url: "/order/list1",
      method: "get"
    });
  },

  // 分页搜索方法
  // page 当前页码, size每页查询条数, map条件查询的条件值
  search(page, size, map) {
    return request({
      url: `/order/list/search/${page}/${size}`,
      method: "post",
      data: map
    });
  }
};