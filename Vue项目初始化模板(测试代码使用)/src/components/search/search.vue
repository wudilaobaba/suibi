<template>
<div>
  <button type="button" @click="fun">anniu</button>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      arrow: false
    }
  },
  methods: {
    // fun() {
    //   if (this.arrow) {
    //     console.log("退出了");
    //   } else {
    //     console.log('再按一次退出');
    //     this.arrow = true
    //     setTimeout(() => {
    //       this.arrow = false
    //     }, 2000)
    //   }
    // }
    fun() {
      if (this.arrow) {
        console.log('退出了');
      } else {
        this.arrow = true
        console.log('再按一次退出');
        setTimeout(() => {
          this.arrow = false
        }, 2000)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
