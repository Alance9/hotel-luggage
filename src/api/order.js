import request from "../utils/request";

export function add(depList) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/luggage/neworderFromWeb", //"/order/add" /* '/luggage/neworder' */,
    method: "post",
    data: depList
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
}

export function getluggage(info) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/luggage/getluggage",
    method: "post",
    data: info
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
}

// 查询所有订单
export function SelectAllOrder() {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/luggage/SelectAllOrder",
    method: "post"
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
}

// 修改订单提交功能
export function updateOrder(info) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/luggage/updateOrder",
    method: "post",
    data: info
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
}

export default {
  //添加订单
  add(depList) {
    return request({
      url: "http://luggage.vipgz2.idcfengye.com/luggage/neworderFromWeb", //"/order/add" /* '/luggage/neworder' */,
      method: "post",
      data: depList
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // }
    });
  }
  // 分页搜索方法
  // page 当前页码, size每页查询条数, map条件查询的条件值
  // search(page, size, map) {
  //   return request({
  //     url: `/order/list/search/${page}/${size}`,
  //     method: "post",
  //     data: map
  //   });
  // }
};

// 寄存者搜索
export function searchOrder1(info) {
  return request({
    url: "http://luggage.vipgz2.idcfengye.com/record/BySaverid",
    method: "post",
    data: info
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
};

// 验证码搜索
export function searchOrder2(info) {
  return request({
    url: "http://luggage.vipgz2.idcfengye.com/record/ByGetcode",
    method: "post",
    data: info
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
};

// 联系方式搜索
export function searchOrder3(info) {
  return request({
    url: "http://luggage.vipgz2.idcfengye.com/record/ByPhonenumber",
    method: "post",
    data: info
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });
};