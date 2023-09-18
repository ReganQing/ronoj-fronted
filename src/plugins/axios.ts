import axios from "axios";
import { OpenAPI } from "../../generated";
import * as process from "process";

// 携带凭证
// axios.defaults.withCredentials = true;
OpenAPI.WITH_CREDENTIALS = true;
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "http://120.27.192.50:80";
OpenAPI.BASE = baseUrl;
console.log("当前环境：", process.env.NODE_ENV, "请求地址", baseUrl);

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在请求发送前做些什么
    return config;
  },
  function (error) {
    // 如果请求错误需要做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log("响应", response);
    // 状态代码在2xx之间的都会触发这个函数
    // 利用响应数据做些什么
    return response;
  },
  function (error) {
    // 状态代码在2xx之外的都会触发这个函数
    // 如果响应失败应该做些什么
    return Promise.reject(error);
  }
);
