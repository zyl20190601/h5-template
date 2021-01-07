import axios from 'axios';
import router from '@/routers';
import store from '@/store';
import { isProd } from '@/utils/env.js';

const debug = isProd ? false : true;
// 创建接口连接实例
let axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/api',
  timeout: 10000,
  withCredentials: true, //是否携带cookie
  // headers: {
  //     Accept: 'application/json, text/javascript, */*',
  //     'Content-Type': 'application/json;charset=utf-8',
  // },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
// 超时时间 http请求拦截器
axiosInstance.interceptors.request.use(
  async (config) => {
    if (debug) {
      if (config.method === 'post') {
        console.log(`%c 发送 api_${config.url.replace(/\/(\w+)\//, '')}${config.data && config.data.action ? '_' + config.data.action : ''} `, 'background:#2472C8;color:#fff', config.data);
      } else {
        console.log(`%c 发送 api_${config.url.replace(/\/(\w+)\//, '')}${config.params && config.params.action ? '_' + config.params.action : ''} `, 'background:#2472C8;color:#fff', config.params);
      }
    }
    config.data = config.data || {};
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// http响应拦截器
axiosInstance.interceptors.response.use(
  (data) => {
    if (debug) {
      console.log(
        `%c 接收 api_${data.config.url.split('/').pop()}${data.config.data && qs.parse(data.config.data).action ? '_' + qs.parse(data.config.data).action : ''} `,
        'background:#1E1E1E;color:#bada55',
        JSON.parse(JSON.stringify(data.data))
      );
    }
    // debugger;
    if (data.data) {
      if (data.data.code !== 0) {
        switch (data.data.code) {
          case 1000:
            router.replace('/login');
            return Promise.reject(new Error(`请登入`));
          default:
            return Promise.reject(new Error(`请求失败`));
        }
      }
      return data.data.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function get(url, params = {}) {
  return axiosInstance.get(url, { params });
}
export function post(url, body = {}, key = _key) {
  _key = key;
  return axiosInstance.post(url, body);
}
