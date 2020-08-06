<template>
  <el-dialog
    width="57%"
    title="活动图片"
    :visible.sync="innerVisible"
    append-to-body
  >
    <img src="../../../../../../assets/cesium_images/党员活动.jpg">
  </el-dialog>
</template>

<script>
export default {
  name: '',
  props: {
    popened: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerVisible: false
    }
  },
  watch: {
    popened() {
      this.innerVisible = true
    }
  }
}
</script>

<style lang="" scoped>
</style>
