import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
//用jsonp去抓取数据
export function getSingerList() {
  //jsonp(url, data, options);
  //url就是控制台中XHR中的地址
  //data就是data.jpg那种图片中的内容(里面都是数据的参数)，在config.js中来配置相同的参数
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  const data = Object.assign({}, commonParams, {
    //这里的东西还是data.jpg图中的内容
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    hostUin: 0,
    format: 'jsonp',
    platform: 'yqq',
    needNewCode: 0,
  });
  return jsonp(url, data, options)
}
