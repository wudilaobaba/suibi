<template>
<div class="slider" ref="slider">
  <div class="slider-group" ref="sliderGroup">
    <slot>
    </slot>
    <!--
      这里是槽口，当我在<slider></slider>标签中写东西的时候，
      <slider></slider>中间的东西就显示在了<slot></slot>的位置
    -->
  </div>
  <div class="dots">
    <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex==index}"></span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
//使用轮播图组件：
import BScroll from 'better-scroll'
import {
  addClass
} from 'common/js/dom.js'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: { //是否循环轮播
      type: Boolean,
      default: true
    },
    autoPlay: { //是否自动轮播
      type: Boolean,
      default: true
    },
    interval: { //滚动时间间隔
      type: Number,
      default: 3000
    }
  },
  mounted() {
    setTimeout(() => { //保证DOM成功渲染
      this._setSliderWidth(); //设置slider各个部分额宽度
      this._initSlider(); //初始化better-scroll
      this._initDots(); //初始化轮播图下面的小圆点
      if (this.autoPlay) {
        this._play()
      }
    }, 20);

    //解决当窗口变化的时候，轮播图位置错误
    //页面宽度发生变化的时候执行以下'resize'方法
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    })
  },
  methods: {
    _setSliderWidth(isResize) { //初始化slider的宽度
      this.children = this.$refs.sliderGroup.children;
      console.log(this.children.length);
      let width = 0; //总宽度

      //slider的可见宽度(也是槽口中每一个元素的宽度)(可见区域宽度)
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        //每一个children要添加一个class,
        //添加class的方法是通用的，所以在通用文件common中新建一个dom.js
        addClass(child, 'slider-item');
        child.style.width = sliderWidth + 'px';
        width += sliderWidth
      }

      //如果是循环轮播，那么左右要分别再加一个子元素，所以总宽度的基础上还要加两个子元素的宽度
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },

    //初始化batter-scroll
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true, //可以横向滚动
        scrollY: false,
        momentum: false, //惯性
        snap: true,
        snapLoop: this.loop, //是否循环,如果是true的话那么就自动创建两个元素，一个在最前，一个在最后，那么滚动的元素就多了两个
        snapThreshold: 0.3, //
        snapSpeed: 300
      });
      //batter-scroll提供的一个滚动一帧结束后触发的事件
      this.slider.on('scrollEnd', () => {
        //batter-scroll提供的方法：获取此刻滚动完毕后,当前滚动内容的索引值
        let pageIndex = this.slider.getCurrentPage().pageX; //
        //console.log(pageIndex)
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _initDots() {
      //将dots数据转为一个与this.children.length数量相同的数组
      if (this.loop) {
        this.dots = new Array(this.children.length - 2);
      } else {
        this.dots = new Array(this.children.length);
      }
      console.log(this.children.length)
    },
    _play() { //自动播放的方法
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 300) //三个参数(x方向,y方向,滚动时间)
      }, this.interval)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
