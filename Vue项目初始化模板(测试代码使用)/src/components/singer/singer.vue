<template>
<div>
  <div class="select" @click="showPicker(3)" ref="select3">{{ selectedText[0] }}</div>
  <city-picker @select="handleSelect(3,arguments)" :data="data[0]" :selected-index="selectedIndex[0]" ref="picker3" :title="title[3]" :cancelTxt="'取消'" :confirmTxt="'确定'"></city-picker>
</div>
</template>

<script type="text/ecmascript-6">
import CityPicker from '../allPicker/cityPicker/city-picker.vue'
import {
  provinceList,
  cityList,
  areaList
} from '../allPicker/cityPicker/data/areaData'



export default {
  data() {
    return {
      data: [
        [provinceList, cityList, areaList]
      ],
      selectedIndex: [
        [0, 0, 0]
      ],
      selectedText: [
        '请选择地区'
      ],
      title: [

      ]
    }
  },
  methods: {
    showPicker(index) {
      let picker = this.$refs['picker' + index]

      picker.show()
    },
    handleSelect(index, args) {
      console.log(args)
      this.selectedText.splice(index, 1, args[2].join('，'))
    }
  },
  components: {
    CityPicker
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
