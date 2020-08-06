<template>
  <div>
    <el-tabs
      v-model="activeName"
      class="tabs"
    >
      <el-tab-pane
        label="基础信息"
        name="first"
      >
        <BasicInformation />
      </el-tab-pane>
      <el-tab-pane
        label="网格员信息"
        name="second"
      >
        <div class="grid">
          <div class="text">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">所属社区</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">XXXXX</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">网格管理员</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">李X</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">联系方式</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">18088888888</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">管辖网格编号</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">9</div>
              </el-col>
            </el-row>
          </div>
          <div class="img">
            <img
              src="../../../../../../assets/头像 (1).png"
              alt=""
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicInformation from '../BasicInformation'
export default {
  name: '',
  components: {
    BasicInformation
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style scoped>
.grid {
  width: 100%;
  height: 200px;
}

.text {
  float: left;
  width: 50%;
  font-size: 14px;
  color: #606266;
}

.img {
  float: right;
  width: 50%;
  text-align: center;
  vertical-align: middle;
  /* border: 1px solid #ebeef5; */
}

img {
  vertical-align: middle;
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
