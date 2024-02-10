
/**
 * 获取图片信息，网络图片需先配置 download 域名才能生效。
 * @param {String} src 
 */
export const getImageInfo = (src) => {
  return new Promise((success, fail) => wx.getImageInfo({ src, success, fail }))
}

/**
 * 保存图片到系统相册
 * @param {Object} options 
 */
export const saveImageToPhotosAlbum = (options) => {
  return new Promise((success, fail) => wx.saveImageToPhotosAlbum({ ...options, success, fail }))
}

/*
// 封装
export const getImageInfo = (src) => {
  return new Promise((success, fail) => wx.getImageInfo({ src, success, fail }))
}

// 使用
const getBg = getImageInfo(bgUrl)
const getAvatar = getImageInfo(avatarUrl)
Promise.all([getBg, getAvatar]).then(([bg, avatar]) => {
  // ...
})
*/