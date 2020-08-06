<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="25%">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="type" label="事件类型" width="120px" align="center" />
      <el-table-column prop="location" label="发生地点" width="160px" align="center" />
      <el-table-column prop="time" label="监测发生时间" width="150px" align="center" />
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="callPlc">通知物业</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "",
  props: {
    fireOpened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: "紧急事件",
      dialogVisible: false,
      tableData: [
        {
          type: "火灾",
          location: "水岸星城G18-1-2302",
          time: "2019-5-31-13:11",
        },
      ],
      loading: false,
    };
  },
  watch: {
    fireOpened() {
      this.dialogVisible = true;
    },
  },
  mounted() {},
  methods: {
    callPlc() {
      this.loading = true;
      var _this = this;
      setTimeout(() => {
        _this.loading = false;
        _this.$notify({
          title: "成功",
          message: "已通知火警",
          type: "success",
        });
      }, 3000);
    },
  },
};
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
