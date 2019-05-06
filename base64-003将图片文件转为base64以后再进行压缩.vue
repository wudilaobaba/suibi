<template>
<div>
  <input type="file" @change="change" multiple/>
  <!--加multiple代表文件可以被多选，但是个别手机好像不支持multiple-->
  <!--
    base64 003. 通过file选中任意图片文件，将选中的文件转为base64格式，得到一个base64图片，再将该base64图片进行压缩后，返回压缩后的base64
    ***该组件一定要被父组件使用才行
  -->
</div>
</template>

<script type="text/ecmascript-6">
import {
  imageCompress
} from 'js-fun-bywhj'
export default {
  methods: {
    change(e) {
      let that = this
      let files = e.target.files || e.dataTransfer.files;
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        //获取上传的文件的扩展名，便于我自己的NodeJS读到上传的文件后，将base64还原为文件后要使用这个扩展名
        let extName = '.' + files[i].name.split('.')[files[i].name.split('.').length - 1]
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = function(e) {
          let detailImage = ''
          let img = new Image();
          img.src = this.result
          img.onload = function() {
            detailImage = imageCompress(img, 100, 5)
            that.$emit('xx', detailImage, extName)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
