//插件模块
import axios from "axios";
import qs from "qs";
import { Loading, Message } from "element-ui";

//加载模块
const loading = {
  loadingInstance: null,
  open() {
    if (this.loadingInstance === null) {
      this.loadingInstance = Loading.service({
        target: ".main",
        text: "QAQ加载中，主人请稍等"
        /* background: 'rgba(0, 0, 0, 0.5)' */
      });
    }
  },
  close() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  }
};

const request = axios.create({
  baseURL: "", //'http://luggage.vipgz2.idcfengye.com',
  /* process.env.VUE_APP_BASE_API  上线需要 */

  /* 'http://192.168.31.71:8080', */
  /* "http://mengxuegu.com:7300/mock/5d6a8c22facc296cd6835190" */
  timeout: 5000 //请求超时
});

request.interceptors.request.use(
  config => {
    //config.headers["Content-Type"] = "application/x-www-form-urlencoded"; // 关键所在
    //请求拦截
    loading.open();
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    // config.headers.authorization = localStorage.getItem("myview-token");
    // config.headers.Authentication = store.state.token
    console.log(config.headers.authorization + '123')
    return config;
  },
  error => {
    loading.close();
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    //响应拦截
    setTimeout(() => {
      loading.close();
    }, 500);
    const resp = response.data;

    if (resp.code !== 2000) {
      Message({
        message: resp.message || "获取数据失败",
        type: "warning",
        duration: 5 * 1000
      });
    }
    return response;
  },
  error => {
    loading.close();
    Message({
      message: "网络获取数据失败",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

/* MyAxios.install = (Vue) => {
    Vue.prototype.$http = axios
    axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
} */

/* export const downloadTemplate = function(scheduleType) {
  axios
    .get("/rest/schedule/template", {
      params: {
        scheduleType: scheduleType
      },
      responseType: "arraybuffer"
    })
    .then(response => {
      //创建一个blob对象,file的一种
      let blob = new Blob([response.data], { type: "application/x-xls" });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download =
        fileNames[scheduleType] + "_" + response.headers.datestr + ".xls";
      link.click();
    });
}; */

export default request;
