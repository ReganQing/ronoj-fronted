import axios from "axios";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    // 在请求发送前做些什么
    return config;
  },
  function (error) {
    // 做些什么，如果请求错误
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log("响应", response);
    // 状态代码在2xx之间的都会触发这个函数
    // 利用响应数据做些什么
    return response;
  },
  function (error) {
    // 状态代码在2xx之间的都会触发这个函数
    // 如果响应失败应该做些什么
    return Promise.reject(error);
  }
);
