<template>
<div class="singer">
  <list-view :data="singers"></list-view>
</div>
</template>

<script type="text/ecmascript-6">
import {
  getSingerList
} from 'api/singer'

import {
  Err_OK
} from 'api/config'

import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;

export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  components: {
    ListView
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => { //res就是控制台中response中对应的字符串
        if (res.code === Err_OK) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers);
        }
      })
    },
    _normalizeSinger(list) { //将请求来的数据格式变为我们想要的数据格式
      let map = {
        hot: { //热门歌手，控制仅显示10条
          title: HOT_NAME,
          items: []
        }
      }
      //歌手的头像http://y.gtimg.cn/music/photo_new/T001R150x150M0000025NhlN2yWrP4.jpg?max_age=2592000
      //包含Fsinger_mid字段的值
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      //为了得到有序列表，要处理 map
      let hot = [] //热门数组
      let ret = [] //非热门数组
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => { //字符串排序的方法要掌握
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
