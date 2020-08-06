<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="25%"
  >
    <div class="main">
      <div>
        <div class="msg">
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">姓名</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">刘德兰</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">性别</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">女</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">年龄</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">60</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">电话</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">18971250339</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">居住地址</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">水星新城-H15-2-101</div>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">身份证号</div>
            </el-col>
            <el-col :span="16">
              <div class="grid-content bg-purple">422429194105096540</div>18971250339
            </el-col>
          </el-row> -->
        </div>
        <div class="img">
          <img
            src="../../assets/cesium_images/刘德兰.png"
            alt=""
            class="oldMan-img"
          >
        </div>

      </div>

    </div>
  </el-dialog>
</template>

<script>
// import oldMen from '../../assets/cesium_images/刘德兰.png'
export default {
  name: '',
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '老年人信息',
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
  height: 200px;
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
  width: 60%;
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
