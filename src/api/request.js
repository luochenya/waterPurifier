/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import QS from "qs";
import { domain } from "./util.js";
// import { Message } from 'element-ui'
// import store from '../store/index'

// 环境的切换
/* if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://api.123dailu.com/'
} */
// axios.defaults.baseURL = '/API'
// axios.defaults.baseURL = 'https://crmreport.sakura.com.tw/API'
// axios.defaults.baseURL = 'https://partner.sakura.com.tw/'

// ->1,模块一接口,url地址
axios.defaults.baseM1URL = domain.Base_M1_URL;
// ->2,模块二接口,url地址
axios.defaults.baseM2URL = domain.Base_M2_URL;
// ->2,模块二接口,url地址
axios.defaults.baseM3URL = domain.Base_M3_URL;
// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded',
//   Accept: 'application/json'
// }
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // console.log(config)
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    // return config
    if (config.url.includes("/GetMFNO")) {
      config.headers["Content-Type"] = "multipart/form-data";
      // console.log('to')
      // console.log(config)
    }
    // console.log(config)
    return config;
  },
  error => {
    // console.log('333')
    // console.log(error.response)
    // this.$message.error({
    //   message: '登录过期，请重新登录',
    //   duration: 1000,
    //   forbidClick: true
    // })
    // if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    //   console.log('错误回调', error)
    //   alert('网络超时')

    //   return Promise.resolve(error) // reject这个错误信息
    // }
    return Promise.error(error);
  }
);

// 响应拦截器
/* axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      console.log(response.status)
      return Promise.resolve(response)
    } else {
      // console.log('111')
      // return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => { */
/*   if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          this.$router.replace({
            path: '/login',
            query: { redirect: this.$router.currentRoute.fullPath }
          })
          break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          this.$message.error({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true
          })
          // 清除token
          localStorage.removeItem('token')
          // store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            this.$router.replace({
              path: '/login',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
          // 404请求不存在
        case 404:
          this.$message.error({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          })
          break
          // 其他错误，直接抛出错误提示
        default:
          this.$message({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          })
      }
      return Promise.reject(error.response)
    } */
// console.log(error.message.timeout)
/*    if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      // console.log('错误回调', error)
      Message({
        message: '网络超时！',
        type: 'error'
      })

      // return Promise.resolve(error) // reject这个错误信息
    }
    return Promise.reject(error)
  }
) */
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function requireData(url, params, item) {
  if (!url) return false;
  switch (item) {
    case 1:
      url = axios.defaults.baseM1URL + url;
      break;
    default:
      url = axios.defaults.baseM2URL + url;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function requireData2(url, params, item) {
  if (!url) return false;
  switch (item) {
    case 1:
      url = axios.defaults.baseM1URL + url;
      break;
    default:
      url = axios.defaults.baseM2URL + url;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function cascadePost(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(axios.defaults.baseM3URL + url, QS.stringify(data)).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
// ->接口1的请求数据方法
export function reqM1Service(url, params) {
  return requireData.call(this, url, params, 1);
}
// ->接口2的请求数据方法
export function reqM2Service(url, params) {
  return requireData2.call(this, url, params, 2);
}
