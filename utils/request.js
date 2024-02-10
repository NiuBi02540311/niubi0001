/**
 * promisify wx.request
 * @param {String} baseURL 域名
 * @param {String} url 请求路径
 * @param {Object} data 请求参数
 * @param {String} method 请求方法
 */
//httpss://www.ynkui.com/articles/?type=detail&id=2922
class Request {
  constructor(params) {
    this.withBaseURL = params.withBaseURL
    this.baseURL = params.baseURL
  }

  get(url, data) {
    return this.request('GET', url, data)
  }

  post(url, data) {
    return this.request('POST', url, data)
  }

  request(method, url, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        method,
        data,
        url: this.withBaseURL ? this.baseURL + url : url,
        header: getApp().globalData.getHeader(),
        success: (res) => resolve(res),
        fail: (err) => reject(err),
      })
    })
  }
}

export default new Request({
  withBaseURL: true,
  baseURL: getApp().globalData.host,
})

/*
后端接口统一管理
为了便于管理，我们往往会将项目中使用到的 HTTP 请求放到一起进行维护：
// apis/user.js
import request from '../utils/request'

export const addUser = (data) => request.post('/user/add', data)
export const getUserList = (data) => request.get('/user/list', data)
export const getUserInfo = (data) => request.get('/user/info', data)
复制代码
// apis/product.js
import request from '../utils/request'

export const addProduct = (data) => request.post('/product/add', data)
export const getProductList = (data) => request.get('/product/list', data)
export const getProductDetail = (data) => request.get('/product/detail', data)
*/