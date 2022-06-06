<template>
  <el-dialog
    :title="title"
    :data="taxpointinfo"
    :visible.sync="dialogVisible"
		:modal="false"
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
                <div class="grid-content bg-purple">{{taxpointinfo.name || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">纳税金额</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{taxpointinfo.tax + '万元' || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">企业性质</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{taxpointinfo.enterprise || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">经营行业</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{taxpointinfo.industryname || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">联系人</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{taxpointinfo.contact || "无"}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple">联系方式</div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">{{taxpointinfo.phhone || "无"}}</div>
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
    taxpointinfo:{
       type: Object,
       default:function() {
        return []
      }
    }
  },
  data() {
    return {
      title: '公司信息',
      dialogVisible: false,
    }
  },
  watch: {
    opened() {
      this.dialogVisible = true
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
