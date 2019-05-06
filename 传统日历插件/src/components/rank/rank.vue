<template>
<div>
  <button type="button" @click="showCal">show</button><span>{{date}}</span>
  <cal ref="cals" v-model="calendarShow" @input="showCType" @change="seleceDate" :format='format' :defaultDate="currentDate"></cal>
</div>
</template>

<script type="text/ecmascript-6">
import cal from 'base/calendar/calendar'
export default {
  data() {
    return {
      calendarShow: false, //控制日历插件的显示和隐藏
      date: '',
      format: 'yyyy/MM/dd',
      currentDate: new Date(Date.now() - 86400000 * 592),
    }
  },
  methods: {
    showCal() {
      this.calendarShow = true
    },
    showCType(v) {
      //console.log(v);
    },
    seleceDate(date, formatDate) {
      console.log(date, formatDate)
      this.date = formatDate
      this.currentDate = date
    }
  },
  components: {
    cal
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
