import jsonp from 'common/js/jsonp'
import {
  commonParams,
  options
} from './config'
import axios from 'axios'

// ***** 轮播图的jsonp接口 ********
//用jsonp去抓取数据
export function getRecommend() {
  //jsonp(url, data, options);
  //url就是控制台中XHR中的地址
  //data就是data.jpg那种图片中的内容(里面都是数据的参数)，在config.js中来配置相同的参数
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    //这里的东西还是data.jpg图中的内容(公共的)
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  });
  return jsonp(url, data, options)
}




// ***** 歌单的jsonp接口(其实不算是jsonp) ********
export function getDiscList() {
  const url = 'api/getDiscList';
  const data = Object.assign({}, commonParams, {
    //这里的东西还是data.jpg图中的内容(只属于歌单接口的)
    hostUin: 0,
    platform: 'yqq',
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json' //看控制台中的network的XHR，写着一句是以json的方式在Response中显示
  });
  return axios.get(url, {
    params: data //将参数传进去params不可改为其他单词
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
