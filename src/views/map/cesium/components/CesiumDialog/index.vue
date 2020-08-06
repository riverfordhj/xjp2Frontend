<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <div v-if="layerType == '楼栋'">
        <Building />
      </div>
      <div v-else-if="layerType === '网格'">
        <Grid />
      </div>
      <div v-else>
        <Community :title="title" />
      </div>

    </el-dialog>
  </div>
</template>

<script>
import Building from './Building/index'
import Grid from './Grid/index'
import Community from './Community/index'

export default {
  name: '',
  components: {
    Building,
    Grid,
    Community
  },
  props: {
    title: {
      type: String,
      default: '属性窗口'
    },
    opened: {
      type: Boolean,
      default: false
    },
    layerType: {
      type: String,
      default: '网格'
    }
  },
  data() {
    return {
      dialogVisible: false,
      ctype: ''
    }
  },
  watch: {
    opened(newVal, oldVal) {
      this.dialogVisible = true
    },
    layerType(newVal) {
    }
  }
}
</script>

<style scoped>
</style>
