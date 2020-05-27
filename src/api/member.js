import request from "../utils/request";

export default {
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

// 行李员获取
export function selectAllReceiver() {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/selectAllReceiver",
    method: "post"
  });
}

// 用户信息修改
export function updateMember(info) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/update",
    method: "post",
    data: info
  });
}

// 添加用户
export function addMember(info) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/uregister",
    method: "post",
    data: info
  });
}

// 管理员获取
export function selectAllSuperUser() {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/selectAllSuperUser",
    method: "post"
  });
}

// 用户名搜索
export function addSuperUser(info) {
  return request({
    url: "http://luggage.gz2vip.idcfengye.com/user/selectUsername",
    method: "post",
    data: info
  });
}
