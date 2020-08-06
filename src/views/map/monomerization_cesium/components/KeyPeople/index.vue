<template>
  <div class="box-card">
    <el-card style="height:90%">
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{ title }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
        >关闭</el-button>
      </div>
      <el-form
        v-if="type===1"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="姓名">
          <el-tag type="danger">邓艾</el-tag>
        </el-form-item>
        <el-form-item label="性别">
          <el-tag type="info">男</el-tag>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-tag type="warning">42011119840818161X</el-tag>
        </el-form-item>
        <el-form-item label="教育情况">
          <el-tag type="info">高中</el-tag>
        </el-form-item>
        <el-form-item label="婚姻状态">
          <el-tag type="info">已婚</el-tag>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-tag type="info">13588422251</el-tag>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-tag type="warning">G16-1-1201</el-tag>
        </el-form-item>
        <el-form-item label="罪名">
          <el-tag type="danger">聚众斗殴</el-tag>
        </el-form-item>
        <el-form-item label="矫正类型">
          <el-tag type="danger">缓刑</el-tag>
        </el-form-item>
        <el-form-item label="入矫日期">
          <el-tag type="info">2016.07.26</el-tag>
        </el-form-item>
        <el-form-item label="解矫日期">
          <el-tag type="info">2019.07.25</el-tag>
        </el-form-item>
        <el-form-item label="管理等级">
          <el-tag type="danger">普管</el-tag>
        </el-form-item>
      </el-form>
      <el-form
        v-else-if="type===2"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="姓名">
          <el-tag type="danger">谭志</el-tag>
        </el-form-item>
        <el-form-item label="性别">
          <el-tag type="info">男</el-tag>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-tag type="warning">420106197911204852</el-tag>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-tag type="success">1979.11.20</el-tag>
        </el-form-item>
        <el-form-item label="名族">
          <el-tag type="success">汉族</el-tag>
        </el-form-item>
        <el-form-item label="文化水平">
          <el-tag type="info">本科</el-tag>
        </el-form-item>
        <el-form-item label="是否农村籍">
          <el-tag type="success">否</el-tag>
        </el-form-item>
        <el-form-item label="户籍地址">
          <el-tag type="info">武昌区水岸星城G17-4805室</el-tag>
        </el-form-item>
        <el-form-item label="释放时间">
          <el-tag type="success">2018.06.05</el-tag>
        </el-form-item>
        <el-form-item label="备注">
          <el-tag type="danger">受贿，2016.06.06-2018.06.05，徐家棚司法所</el-tag>
        </el-form-item>
      </el-form>
      <el-form
        v-else
        ref="form"
        label-width="100px"
      >
        <el-form-item label="姓名">
          <el-tag type="danger">何彦</el-tag>
        </el-form-item>
        <el-form-item label="性别">
          <el-tag type="info">男</el-tag>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-tag type="warning">4201111968205184553</el-tag>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-tag type="info">18856554383</el-tag>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-tag type="info">秦园路118号G11栋2单元3001室</el-tag>
        </el-form-item>
        <el-form-item label="重点原因">
          <el-tag type="danger">涉政人员</el-tag>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    ktype: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeName: 'first',
      type: 3,

      title: '矫正人员'
    }
  },
  watch: {
    ktype(newVal) {
      this.type = newVal
      if (newVal === 1) {
        this.title = '矫正人员'
      } else if (newVal === 2) {
        this.title = '刑满释放人员'
      } else {
        this.title = '涉政人员'
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  position: absolute;
  width: 500px;
  height: calc(100vh - 84px);
  right: 10px;
  top: 5px;
}

.label {
  margin-bottom: 10px;
  font-size: 14px;
  color: #606266;
  font-weight: 700;
  line-height: 40px;
}

.img {
  border-radius: 10px;
}
</style>
