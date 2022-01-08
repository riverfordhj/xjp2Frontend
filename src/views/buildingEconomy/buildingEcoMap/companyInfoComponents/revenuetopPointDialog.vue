<template>
  <el-dialog
    :title="title"
    :data="revenuepointinfo"
    :visible.sync="dialogVisible1"
    width="25%"
  >
    <div class="main">
      <div>
          <div class="msg">
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">企业名称</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{revenuepointinfo.name || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">营收金额</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{revenuepointinfo.revenue + '万元' || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">企业性质</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{revenuepointinfo.enterprise || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">经营行业</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{revenuepointinfo.industryname || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">联系人</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{revenuepointinfo.contact || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">联系方式</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{revenuepointinfo.phhone || "无"}}</div>
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
    opened1: {
      type: Boolean,
      default: false
    },
    revenuepointinfo:{
       type: Object,
       default:function() {
        return []
      }
    }
  },
  data() {
    return {
      title: '公司信息',
      dialogVisible1: false,
    }
  },
  watch: {
    opened1() {
      this.dialogVisible1 = true
    }
  },
  methods:{
		
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 240px;
  /* background-color: cadetblue; */
}

.msg {
  float: left;
  width: 100%;
  font-size: 12px;
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