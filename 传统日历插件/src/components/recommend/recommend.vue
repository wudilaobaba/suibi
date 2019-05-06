<template>
<div class="recommend">
  <scroll ref="scroll" class="recommend-content" :data="discList">
    <div>{{/*使用Scroll一定要在想要滚动的元素的外面包一个整体的div*/}}
      <input type="text" v-model="name">
      <button type="button" :disabled='btn'>1111</button>
      <div class="slider-wrapper" v-if="recommends.length">
        <!--当有recommends的时候才显示-->
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in discList" class="item">
            <div class="icon">
              <img v-lazy="item.imgurl" width="60" height="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-container" v-show="!discList.length">
      <Loading/>
    </div>
  </scroll>
</div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import {
  getRecommend, //  轮播图的jsonp方法
  getDiscList //  歌单列表的jsonp方法
} from 'api/recommend'

import {
  Err_OK
} from 'api/config'

export default {
  data() {
    return {
      recommends: [],
      discList: [],
      name: 30,
      btn: true
    }
  },
  watch: {
    name(val, oldVal) {
      if (!oldVal) {
        this.btn = true
      } else {
        this.btn = false
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  created() {
    this._getRecommend();
    this._getDiscList()
  },
  methods: {
    //轮播图 jsonp
    _getRecommend() {
      getRecommend().then((res) => { //res就是控制台中response中对应的字符串
        if (res.code === Err_OK) {
          //console.log(res.data.slider);
          this.recommends = res.data.slider;
        }
      })
    },
    //歌单列表 jsonp
    _getDiscList() {
      getDiscList().then((res) => { //res就是控制台中response中对应的字符串
        if (res.code === Err_OK) {
          //console.log(res.data.list);
          this.discList = res.data.list;
        }
      })
    },
    loadImage() { //当轮播图加载图片的时候就调用该方法重新加载scroll  （只计算轮播图下面的列表的高度）
      if (!this.checkLoaded) { //checkLoaded就是一个标志位(实现只执行一次就好，而不执行多次)
        this.$refs.scroll.refresh();
        this.checkLoaded = true
      }

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
