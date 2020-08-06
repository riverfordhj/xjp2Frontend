<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="42%"
  >
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="姓名"
        width="120px"
        align="center"
      />
      <el-table-column
        prop="sex"
        label="性别"
        width="160px"
        align="center"
      />
      <el-table-column
        prop="age"
        label="年龄"
        width="150px"
        align="center"
      />
      <el-table-column
        prop="idCard"
        label="身份证号"
        width="180px"
        align="center"
      />
      <el-table-column
        prop="house"
        label="居住地址"
        width="150px"
        align="center"
      />
    </el-table>
    <!-- <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        :loading="loading"
        type="primary"
        @click="callPlc"
      >通知火警</el-button>
    </span> -->
  </el-dialog>
</template>

<script>
import { setTimeout } from 'timers'
export default {
  name: '',
  props: {
    popend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '人员信息',
      dialogVisible: false,
      tableData: [{
        name: '陈瑞华',
        sex: '女',
        age: '72',
        phone: '13886117288',
        idCard: '420106194708282411',
        house: 'G21-1-501'
      }],
      loading: false
    }
  },
  watch: {
    popend() {
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
