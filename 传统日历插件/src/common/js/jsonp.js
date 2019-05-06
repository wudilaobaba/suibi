import originJsonp from 'jsonp' //原始jsonp

//自己封装的jsonp
export default function jsonp(url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  //url是一个很纯净的地址，没有任何query
  //通过data将所有的query拼接到url上
  return new Promise((resolve, reject) => {
    //成功  //失败
    originJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data) //处理后端的数据
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = '';
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
