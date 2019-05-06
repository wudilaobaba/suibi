<template>
<div>
  <button type="button" @click="showDateTag">显示日历</button>
  <h1>{{date}}</h1>
  <calendar @checkDate="getSelectDate" @closeDate="closeDate" :showdate="showDate" ref="calendar"></calendar>
</div>
</template>

<script type="text/ecmascript-6">
import calendar from 'base/calendar'
export default {
  data() {
    return {
      showDate: false,
      date: '',
    }
  },
  components: {
    calendar
  },
  methods: {
    getSelectDate(v) {
      this.date = v
    },
    showDateTag() {
      this.showDate = true
      this.$refs.calendar.showDateTag()
    },
    closeDate(v) {
      this.showDate = v
    }
  },
  mounted() {
    this.date = '1999/02/02'
    if (!this.date) {
      return
    } else {
      this.$refs.calendar.postDate = this.date
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
