<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="45%">
    <el-tabs v-model="activeName" class="tabs">
      <el-tab-pane label="事件信息" name="first">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="type" label="事件类型" align="center" />
          <el-table-column prop="location" label="发生地点" align="center" />
          <el-table-column prop="time" label="监测发生时间" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="受灾家属信息" name="second">
        <el-table :data="tableData1" style="width: 100%">
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="gender" label="性别" align="center" />
          <el-table-column prop="IdCard" label="身份证号" align="center" />
          <el-table-column prop="phone" label="联系电话" align="center" />
          <el-table-column prop="location" label="住址" align="center" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="相关受灾人员信息" name="third">
        <el-table :data="tableData2" style="width: 100%">
          <el-table-column prop="name" label="姓名" align="center" />
          <el-table-column prop="gender" label="性别" align="center" />
          <el-table-column prop="IdCard" label="身份证号" align="center" />
          <el-table-column prop="phone" label="联系电话" align="center" />
          <el-table-column prop="location" label="住址" align="center" />
        </el-table>
      </el-tab-pane>
    </el-tabs>

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
      activeName: "first",
      tableData: [
        {
          type: "火灾",
          location: "水岸星城G18-1-2302",
          time: "2019-5-31-13:11",
        },
      ],
      tableData1: [
        {
          name: "于阳",
          gender: "男",
          IdCard: "422201197305055562",
          phone: "13971491351",
          location: "水岸星城G18-1-2302",
        },
      ],
      tableData2: [
        {
          name: "熊凡",
          gender: "男",
          IdCard: "422201197305055585",
          phone: "15871762322",
          location: "水岸星城G18-1-2301",
        },
        {
          name: "谢兵",
          gender: "男",
          IdCard: "422201197305084898",
          phone: "18571606855",
          location: "水岸星城G18-1-2303",
        },
        {
          name: "余艺",
          gender: "女",
          IdCard: "422201197305058945",
          phone: "13971111153",
          location: "水岸星城G18-1-2303",
        },
        {
          name: "王从香",
          gender: "女",
          IdCard: "422201197305053689",
          phone: "13871913556",
          location: "水岸星城G18-1-2304",
        },
        {
          name: "张军",
          gender: "男",
          IdCard: "422201197305058862",
          phone: "15926241793",
          location: "水岸星城G18-1-2306",
        },
        {
          name: "陈思思",
          gender: "女",
          IdCard: "422201197305055678",
          phone: "15972003127",
          location: "水岸星城G18-1-2306",
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
        this.loading = false;
        this.$notify({
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
