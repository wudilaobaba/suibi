<template>
<div>
  <div class="select" @click="showPicker(0)" ref="select0">{{ selectedText[0] }}</div>
  <picker @select="handleSelect(0,arguments)" :selected-index="selectedIndex[0]" ref="picker0" :title="'瓦大喜大'" :cancelTxt="'取消'" :confirmTxt="'确定'"></picker>
</div>
</template>

<script type="text/ecmascript-6">
import Picker from 'components/allPicker/picker/picker.vue'

let data1 = [{
    text: '剧毒0025',
    value: 1
  }, {
    text: '蚂蚁',
    value: 2
  },
  {
    text: '幽鬼',
    value: 3
  },
  {
    text: '主宰',
    value: 4
  },
  {
    text: '卡尔',
    value: 5
  },
  {
    text: '宙斯',
    value: 6
  },
  {
    text: '巫医',
    value: 7
  }, {
    text: '巫妖',
    value: 8
  },
  {
    text: '神谕者',
    value: 9
  },
  {
    text: '撼地神牛',
    value: 10
  },
  {
    text: '蓝胖子',
    value: 11
  },
  {
    text: '水晶室女',
    value: 12
  },
  {
    text: '莉娜',
    value: 13
  },
  {
    text: '斯拉克',
    value: 14
  },
  {
    text: '斯拉达',
    value: 15
  }
]



export default {
  mounted() {
    this.$refs.picker0.setData([data1]) //设置数据源
    this.$refs.picker0.setSelectedIndex([0]) //初始化默认选中项
  },
  data() {
    return {
      data: [
        [data1]
      ],
      selectedIndex: [
        [0]
      ],
      selectedText: [
        '请选择管路'
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
      this.data[0][0].map((item, index) => {
        if (item.text == args[2][0])
          console.log('当前条目的id：', item.value);
      })
      this.selectedText.splice(index, 1, args[2].join('，'))
    }
  },
  components: {
    Picker,
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
