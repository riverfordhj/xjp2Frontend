<template>
  <el-dialog title="图层设置" :visible.sync="option.show" width="250px">
    <div class="block">
      <span class="demonstration">模型颜色:</span>
      <!-- <el-tag>模型颜色:</el-tag> -->
      <el-color-picker v-model="option.color" show-alpha @change="colorChange" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    colorChange() {
      // debugger
      this.$emit('colorChange', this.option.color)
    }
  }
}
</script>

<style scoped>
</style>
