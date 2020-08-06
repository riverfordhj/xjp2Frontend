<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
  >
    <!-- <div class="block"> -->
    <!-- <span class="demonstration">默认</span> -->
    <img
      src="../../../../../assets/cesium_images/oldI.jpg"
      alt=""
      width="49%"
      height="300px"
    >
    <!-- </div> -->
    <!-- <div class="block"> -->
    <img
      src="../../../../../assets/cesium_images/newI.jpg"
      alt=""
      width="49%"
      height="300px"
    >
    <!-- </div> -->
  </el-dialog>
</template>

<script>

export default {
  name: '',
  props: {
    iopend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '违章建筑图片-老|新',
      dialogVisible: false,
      // tableData: [{
      //   name: '徐洪明',
      //   sex: '男',
      //   age: '72',
      //   phone: '13886117288',
      //   idCard: '420106194708282411',
      //   house: 'H33-2-101'
      // }],
      loading: false,
      url: '../../../../../assets/cesium_images/oldI.jpg'
    }
  },
  watch: {
    iopend() {
      // debugger
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="" scoped>
</style>
