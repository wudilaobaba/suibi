<template>
<div>
  <ul>
    <li v-for="(item,index) in checkData" :key="index" @click="checkOne(item)" :style="{color:item.checked?'red':'#000'}">{{item.name}}</li>
  </ul>
  <button type="button" @click="sureBtn">确定</button>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      checkData: [{
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
        checked: true
      }],
      checkedId: null
    }
  },
  methods: {
    checkOne(v) {
      this.checkData.map((item, index) => {
        item.checked = false
      })
      v.checked = true
      this.checkedId = v.id
    },
    sureBtn() {
      this.checkData.map((item, index) => {
        if (item.checked) {
          console.log('当前选中的：', item.id);
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
