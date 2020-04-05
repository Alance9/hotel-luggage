import request from "../utils/request";
//新增订单

export function add(pojo) {
  return request({
    url: "/order/add" /* '/luggage/neworder' */,
    method: "post",
    data: pojo
  });
}
