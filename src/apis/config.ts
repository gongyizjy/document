import { message } from "antd";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    console.log("请求拦截器");
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      localStorage.setItem("token", response.headers.authorization);
    }
    const res = response.data;
    return res;
  },
  (error) => {
    if (error.response.data.msg) {
      message.error(error.response.data.msg);
    }
    return Promise.reject(error.response);
  }
);
export default instance;
