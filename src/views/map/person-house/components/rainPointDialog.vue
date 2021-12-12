<template>
  <el-dialog
    :title="title"
    :data="rainpointinfo"
    :visible.sync="dialogVisible"
    width="25%"
  >
    <div class="main">
      <div>
        <div class="msg">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">名称</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{rainpointinfo.name}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">地址</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{rainpointinfo.address || " "}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">上报人</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{rainpointinfo.report || " "}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">类型</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{rainpointinfo.type || "无"}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">备注</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">{{rainpointinfo.note || "无"}}</div>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>
  </el-dialog>
</template>

<script>

export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    },
    rainpointinfo:{
       type: Object,
       default:function() {
        return []
      }
    }
  },
  data() {
    return {
      title: '渍水点信息',
      dialogVisible: false
    }
  },
  watch: {
    opened() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 240px;
  /* background-color: cadetblue; */
}

.img {
  width: 40%;
  float: right;
  text-align: center;
  vertical-align: middle;
}

.msg {
  float: left;
  width: 100%;
  font-size: 14px;
  color: #606266;
}

.el-row {
  height: 40px;
}
.el-col {
  /* border-radius: 4px; */
  border: 1px solid #ebeef5;
  text-align: center;
  line-height: 40px;
}
</style>
