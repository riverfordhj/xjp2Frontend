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
        <!-- <BasicInformation  /> -->
        <div class="des">{{ des }}</div>
      </el-tab-pane>
      <el-tab-pane
        label="社区信息"
        name="second"
      >
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">社区负责人</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">李X</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">办公电话</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">18088888888</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">地址</div>
          </el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple">XXXXX</div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import BasicInformation from '../BasicInformation'
import community from '../../../../../../assets/json/community.json'

export default {
  name: '',
  components: {
    // BasicInformation
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: 'first',
      des: ''
    }
  },
  watch: {
    title(newVal) {
      // debugger
      // console.log(community)
      this.getBaseInfo(this.title)
    }
  },
  created() {
    // debugger
    // console.log(this.title)
    this.getBaseInfo(this.title)
  },
  methods: {
    getBaseInfo(title) {
      var selectedCommunity = community.filter(c => c.name === title)
      if (selectedCommunity.length === 0) {
        this.des = '当前社区信息缺失'
      } else {
        this.des = selectedCommunity[0].des
      }
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 40px;
  font-size: 14px;
  color: #606266;
}
.el-col {
  /* border-radius: 4px; */
  border: 1px solid #ebeef5;
  text-align: center;
  line-height: 40px;
}

.des {
  font-size: 20px;
  color: #606266;
  text-indent: 2em;
  padding: 1em;
}
</style>
