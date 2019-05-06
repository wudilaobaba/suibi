<template>
<div>
  <ul>
    <li v-for="(item,index) in checkBoxData" :key="index" @click="check(item)" :style="{color:item.checked?'red':'#000'}">{{item.name}}</li>
  </ul>
  <button type="button" @click="sureBtn">确定</button>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      checkBoxData: [{
        name: 'Mike',
        id: 1000,
        checked: false
      }, {
        name: 'Tom',
        id: 1001,
        checked: false
      }, {
        name: 'Jone',
        id: 1002,
        checked: false
      }],
      checkedArr: []
    }
  },
  methods: {
    check(v) {
      v.checked = !v.checked
    },
    sureBtn() {
      this.checkedArr = []
      this.checkBoxData.map((item, index) => {
        if (item.checked) {
          this.checkedArr.push(item.id)
        }
      })
      console.log(this.checkedArr);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
