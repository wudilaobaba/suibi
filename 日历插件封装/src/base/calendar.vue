<template>
<div>
  <transition name="datescroll">
    <div class="wine-togglePart" v-show="showdate">
      <div class="wine-toggle-Tag">
        <span @click="disMask">取消</span>
        <span @click="sureCheckDate(anchors)">确定</span>
      </div>
      <div class="wine-three-wrapper">
        <div class="wine-privince-wrapper wheel-scroll" ref="year">
          <ul ref='yearGroup'>
            <li class="y-hook wheel-item" :class="{'current':index==yearCurrentPage}" v-for="(item,index) in (30+new Date(Date.now()).getFullYear()-1970)" @click="checkSelect($event,'yHeight',index)" style="text-align:right">{{1970+index}}年</li>
          </ul>
        </div>
        <div class="wine-city-wrapper wheel-scroll" ref="month">
          <ul ref='monthGroup'>
            <li class="m-hook wheel-item" :class="{'current':index==monthCurrentPage}" v-for="(item,index) in 12" @click="checkSelect($event,'mHeight',index)">{{item}}月</li>
          </ul>
        </div>
        <div class="wine-zone-wrapper wheel-scroll" ref="date">
          <ul ref='dateGroup'>
            <li v-for="(item,index) in 31" :key="index" class="d-hook wheel-item" :class="{'current':index==dateCurrentPage}" v-if="totalDates == 31" @click="checkSelect($event,'dHeight',index)" style="text-align:left;height:29px;line-height:29px">{{item}}日</li>
            <li v-for="(item,index) in 30" :key="index" class="d-hook wheel-item" :class="{'current':index==dateCurrentPage}" v-if="totalDates == 30" @click="checkSelect($event,'dHeight',index)" style="text-align:left;height:29px;line-height:29px">{{item}}日</li>
            <li v-for="(item,index) in 29" :key="index" class="d-hook wheel-item" :class="{'current':index==dateCurrentPage}" v-if="totalDates == 29" @click="checkSelect($event,'dHeight',index)" style="text-align:left;height:29px;line-height:29px">{{item}}日</li>
            <li v-for="(item,index) in 28" :key="index" class="d-hook wheel-item" :class="{'current':index==dateCurrentPage}" v-if="totalDates == 28" @click="checkSelect($event,'dHeight',index)" style="text-align:left;height:29px;line-height:29px">{{item}}日</li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
  <transition name="mask">
    <div class="maskPart" v-show="showdate" @click="disMask"></div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
  props: {
    showdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      anchors: false,
      yearCurrentPage: 3,
      monthCurrentPage: 3,
      dateCurrentPage: 3,
      year: null,
      month: null,
      date: null,
      isRunYear: false, //是否为润年  润年2月有29天
      totalDates: 28,
      yIndex: 3, //当前选中的年索引值
      mIndex: 3, //当前选中的月索引值
      dIndex: 3, //当前选中的日索引值
      yHeight: [], //获取所有年高度的集合
      mHeight: [], //获取所有月高度的集合
      dHeight: [], //获取所有日高度的集合
      postDate: '',
    }
  },
  methods: {
    disMask() {
      this.$emit('closeDate', false)
    },
    checkSelect(e, type, i) {
      if (type == 'yHeight') {
        console.log(1);
      } else if (type == 'mHeight') {
        this.monthScroll.goToPage(0, i, 500, 'easing')
      } else if (type == 'dHeight') {
        this.dateScroll.goToPage(0, i, 500, 'easing')
      }
    },
    sureCheckDate(v) {
      if (v) {
        return
      }
      this.anchors = false
      this.disMask();
      this.postDate =
        `${this.year.slice(0, this.year.length - 1)}/${this.month.slice(0, this.month.length - 1) < 10
        ? ('0' + this.month.slice(0, this.month.length - 1))
        : this.month.slice(0, this.month.length - 1)}/${this.date.slice(0, this.date.length - 1) < 10
          ? ('0' + this.date.slice(0, this.date.length - 1))
          : this.date.slice(0, this.date.length - 1)}`
      this.$emit('checkDate', this.postDate)
    },
    showDateTag() {
      //-----年
      this.$nextTick(() => {
        //获取每个年的item相对于视口顶部的高度（better-scroll初始状态下）
        this._totalHeight(true, this.$refs.year, this.$refs.yearGroup) // Strep 001
        this.yHeight = this._calculateHeightP(this.$refs.year, 'y-hook')
        //console.log(this.yHeight[1]);
        if (this.yearScroll) {
          this.yearScroll.refresh()
        } else {
          this.yearScroll = new BScroll(this.$refs.year, { //Step 002
            scrollX: false, //可以横向滚动
            scrollY: true,
            click: true, //是否允许点击
            wheel: {
              selectedIndex: 0,
              adjustTime: 10,
              rotate: 25,
              /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item'
            },
            probeType: 3,

          })
        }

        this.yearScroll.on('scroll', (pos) => {
          this.anchors = true
        })
        if (!this.postDate) {
          this.yearCurrentPage = new Date(Date.now()).getFullYear() - 1970
        } else {
          this.yearCurrentPage = this.postDate.slice(0, 4) - 1970
        }
        //console.log(this.yearCurrentPage);
        setTimeout(() => {
          this.yearScroll.scrollTo(0, -`${this.yearCurrentPage*this.$refs.year.clientHeight}`, 1000, 'bounce')
          //console.log('年：', this.yHeight);

        }, 200)
        this.yearScroll.on('scrollEnd', () => {
          this.anchors = false
          let pageIndex = this.yearScroll.getSelectedIndex()
          this.yearCurrentPage = pageIndex
          let year = this.$refs.yearGroup.getElementsByClassName('y-hook')[this.yearCurrentPage].innerHTML
          this.year = year
          //console.log(this.year);
          if ((this.year.slice(0, 4) % 4 == 0 && this.year.slice(0, 4) % 100 !== 0) || this.year.slice(0, 4) % 400 == 0) {
            this.isRunYear = true //是闰年
          } else {
            this.isRunYear = false //不是闰年
          }
          this.caluclakeDates()
        })

        //------月
        this._totalHeight(true, this.$refs.month, this.$refs.monthGroup) // Strep 001
        this.mHeight = this._calculateHeightP(this.$refs.month, 'm-hook')
        if (this.monthScroll) {
          this.monthScroll.refresh()
        } else {
          this.monthScroll = new BScroll(this.$refs.month, { //Step 002
            scrollX: false, //可以横向滚动
            scrollY: true,
            wheel: {
              selectedIndex: 0,
              adjustTime: 10,
              rotate: 25,
              /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item'
            },
            probeType: 3,
            click: true //是否允许点击
          })
        }

        this.monthScroll.on('scroll', (pos) => {
          this.anchors = true
        })
        if (!this.postDate) {
          this.monthCurrentPage = new Date(Date.now()).getMonth()
        } else {
          this.monthCurrentPage = this.postDate.slice(5, 7) - 1
        }

        setTimeout(() => {
          this.monthScroll.scrollTo(0, -`${this.monthCurrentPage*this.$refs.month.clientHeight}`, 1000, 'bounce')
          //console.log('月：', this.mHeight);

        }, 200)
        this.monthScroll.on('scrollEnd', () => {
          this.anchors = false
          let pageIndex = this.monthScroll.getSelectedIndex()
          this.monthCurrentPage = pageIndex
          let month = this.$refs.monthGroup.getElementsByClassName('m-hook')[this.monthCurrentPage].innerHTML
          this.month = month
          //console.log(this.month);
          this.caluclakeDates()
        })

        //-----日
        this._totalHeight(true, this.$refs.date, this.$refs.dateGroup) // Strep 001
        this.dHeight = this._calculateHeightP(this.$refs.date, 'd-hook')
        if (this.dateScroll) {
          this.dateScroll.refresh()
        } else {
          this.dateScroll = new BScroll(this.$refs.date, { //Step 002
            scrollX: false, //可以横向滚动
            scrollY: true,
            wheel: {
              selectedIndex: 0,
              adjustTime: 10,
              rotate: 25,
              /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
              wheelWrapperClass: 'wheel-scroll',
              wheelItemClass: 'wheel-item'
            },
            probeType: 3,
            click: true //是否允许点击
          })
        }

        this.dateScroll.on('scroll', (pos) => {
          this.anchors = true
        })
        if (!this.postDate) {
          this.dateCurrentPage = new Date(Date.now()).getDate() - 1
        } else {
          this.dateCurrentPage = this.postDate.slice(8) - 1
        }

        setTimeout(() => {
          this.dateScroll.scrollTo(0, -`${this.dateCurrentPage*this.$refs.date.clientHeight}`, 1000, 'bounce')
          //console.log('日：', this.dHeight);
        }, 200)
        this.dateScroll.on('scrollEnd', () => {
          this.anchors = false
          let pageIndex = this.dateScroll.getSelectedIndex()
          this.dateCurrentPage = pageIndex
          let date = this.$refs.dateGroup.getElementsByClassName('d-hook')[this.dateCurrentPage].innerHTML
          this.date = date
          //console.log(this.date);
          this.caluclakeDates()
        })
      })
    },
    caluclakeDates() {
      if (this.isRunYear && this.month == '2月') {
        this.totalDates = 29
        this.$nextTick(() => {
          this.$refs.dateGroup.style.height = `${ 29 * this.$refs.date.clientHeight}px`
          setTimeout(() => {
            if (this.dateCurrentPage == 30 || this.dateCurrentPage == 29) {
              this.dateCurrentPage = 28
              this.date = '29日'
            }
            this.dateScroll.refresh();
          }, 20)

        })
        return
      }
      if (!this.isRunYear && this.month == '2月') {
        this.totalDates = 28
        this.$nextTick(() => {
          this.$refs.dateGroup.style.height = `${ 28 * this.$refs.date.clientHeight}px`
          setTimeout(() => {
            if (this.dateCurrentPage == 30 || this.dateCurrentPage == 29 || this.dateCurrentPage == 28) {
              this.dateCurrentPage = 27
              this.date = '28日'
            }
            this.dateScroll.refresh();
          }, 20)

        })
        return
      }
      if (this.month == '1月' || this.month == '3月' || this.month == '5月' || this.month == '7月' || this.month == '8月' || this.month == '10月' || this.month == '12月') {
        this.totalDates = 31
        this.$nextTick(() => {
          this.$refs.dateGroup.style.height = `${ 31 * this.$refs.date.clientHeight}px`
          setTimeout(() => {
            this.dateScroll.refresh();
          }, 20)

        })

      } else {
        this.totalDates = 30
        this.$nextTick(() => {
          this.$refs.dateGroup.style.height = `${ 30 * this.$refs.date.clientHeight}px`
          setTimeout(() => {
            if (this.dateCurrentPage == 30) {
              this.dateCurrentPage = 29
              this.date = '30日'
            }
            this.dateScroll.refresh();
          }, 20)

        })

      }
    },
    _totalHeight(isResize, el, inEl) {
      let wapperHeight = el.clientHeight
      let children = inEl.children
      let height = 0
      for (let i = 0; i < children.length; i++) {
        children[i].style.height = `${wapperHeight}px`
        children[i].style.lineHeight = `${wapperHeight}px`
        height += wapperHeight
      }
      inEl.style.height = `${height}px`
      //console.log(inEl.style.height);
    },
    _calculateHeightP(el, className) {
      //获得每个滚动item的高度集合的数组
      let pList = el.getElementsByClassName(className)
      let height = 0
      let arr = []
      arr.push(height)
      for (let i = 0; i < pList.length; i++) {
        let item = pList[i]
        height += item.clientHeight
        arr.push(height)
      }
      return arr
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (!this.yearScroll) {
        return
      }
      this._totalHeight(true, this.$refs.year, this.$refs.yearGroup)
      this.yearScroll.refresh();
      this._totalHeight(true, this.$refs.month, this.$refs.monthGroup)
      this.monthScroll.refresh();
      this._totalHeight(true, this.$refs.date, this.$refs.dateGroup)
      this.dateScroll.refresh();
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


.wine-mask
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  background-color: rgba(0, 0, 0, 0.5)
  opacity: 1
  -webkit-backdrop-filter: blur(10px)
  backdrop-filter: blur(10px)



.wine-togglePart
  position: absolute
  bottom: 0
  z-index: 50
  height: 181px
  background-color: #fff
  width: 100%
  overflow: hidden
  -webkit-transform: translate3d(0, 0, 0)
  transform: translate3d(0, 0, 0)



.wine-toggle-Tag
  display: -webkit-box
  display: -ms-flexbox
  display: flex
  -webkit-box-pack: justify
  -ms-flex-pack: justify
  justify-content: space-between
  padding: 13px 45px
  background-color: #f2f2f2
  position: relative
  z-index: 51


.wine-toggle-Tag span
  font-size: 14px
  color: #ff4767



.wine-three-wrapper
  display: -webkit-box
  display: -ms-flexbox
  display: flex
  width: 100%
  position: relative
  font-size: 14px
  height: 31px
  top: 55px
  line-height: 31px
  -webkit-box-sizing: border-box
  box-sizing: border-box
  border-top: 1px #d9d9d9 solid
  border-bottom: 1px #d9d9d9 solid


.wine-three-wrapper li
  color: #a2a2a2
  line-height: 31px
  height: 31px


.wine-three-wrapper li.current
  color: #333333

.wine-three-wrapper>div
  -webkit-box-flex: 1
  -ms-flex: 1
  flex: 1
  text-align: center
  position: relative

.datescroll-enter-active, .datescroll-leave-active
  -webkit-transition: 0.5s all
  transition: 0.5s all


.datescroll-enter-active, .datescroll-leave
  -webkit-transform: translate3d(0, 0, 0)
  transform: translate3d(0, 0, 0)

.datescroll-enter, .datescroll-leave-active
  -webkit-transform: translate3d(0, 100%, 0)
  transform: translate3d(0, 100%, 0)

.maskPart
  position:fixed
  top:0
  bottom:0
  width:100%
  background-color:rgba(0,0,0,0.5)
  &.mask-enter-active, &.mask-leave-active
    -webkit-transition: 0.5s all
    transition: 0.5s all


  &.mask-enter-active, &.mask-leave
    opacity:1

  &.mask-enter, &.mask-leave-active
    opacity:0


</style>
