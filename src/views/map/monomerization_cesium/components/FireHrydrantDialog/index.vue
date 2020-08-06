<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="42%"
  >
    <img
      src="../../../../../assets/cesium_images/消防栓.jpg"
      width="100%"
      alt=""
    >
  </el-dialog>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  name: '',
  props: {
    fopened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '人员信息',
      dialogVisible: false,
      tableData: [{
        name: '徐洪明',
        sex: '男',
        age: '72',
        phone: '13886117288',
        idCard: '420106194708282411',
        house: 'H33-2-101'
      }],
      loading: false
    }
  },
  watch: {
    fopened() {
      // debugger
      this.dialogVisible = true
    }
  },
  mounted() {
  },
  methods: {
    callPlc() {
      this.loading = true
      var _this = this
      setTimeout(() => {
        _this.loading = false
        _this.$notify({
          title: '成功',
          message: '已通知火警',
          type: 'success'
        })
      }, 3000)
    }
  }
}
</script>

<style scoped>
.grid-content {
  min-height: 36px;
  font-size: 25px;
  background: #e5e9f2;
  line-height: 36px;
  border-radius: 4px;
  vertical-align: center;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
