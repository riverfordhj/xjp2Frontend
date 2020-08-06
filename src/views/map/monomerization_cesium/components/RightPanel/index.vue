<template>
  <div class="box-card">
    <el-card style="height:90%">
      <div slot="header" class="clearfix">
        <span>城管事件</span>
        <el-button style="float: right; padding: 3px 0" type="text">关闭</el-button>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="事件详情" name="first">
          <el-form ref="form" label-width="80px">
            <el-form-item label="考评大项">
              <el-tag type="danger">违法占道</el-tag>
            </el-form-item>
            <el-form-item label="考评小项">
              <el-tag type="danger">乱堆乱放</el-tag>
            </el-form-item>
            <el-form-item label="位置">
              <el-tag type="warning">武昌区</el-tag>
              <el-divider direction="vertical" />
              <el-tag type="warning">徐家棚街</el-tag>
              <el-divider direction="vertical" />
              <el-tag type="warning">水岸星城社区</el-tag>
            </el-form-item>
            <el-form-item label="发现时间">
              <el-tag effect="dark" type="success">2019-5-29</el-tag>
              <el-divider direction="vertical" />
              <el-tag effect="dark" type="success">13:24:00</el-tag>
            </el-form-item>
            <el-form-item label="整改时间">
              <el-tag effect="dark" type="success">2019-5-30</el-tag>
              <el-divider direction="vertical" />
              <el-tag effect="dark" type="success">16:04:03</el-tag>
            </el-form-item>
            <el-form-item label="整改人">
              <el-tag type="info">禹秋香</el-tag>
            </el-form-item>
            <el-form-item label="审核时间">
              <el-tag effect="dark" type="success">2019-5-30</el-tag>
              <el-divider direction="vertical" />
              <el-tag effect="dark" type="success">16:13:01</el-tag>
            </el-form-item>
            <el-form-item label="督办单位">
              <el-tag type="info">督查室</el-tag>
            </el-form-item>
            <el-form-item label="状态">
              <el-tag type="success">已整改</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="事件照片" name="second">
          <div class="label">整改前</div>
          <div class="label">
            <img
              class="img"
              src="../../../../../assets/cesium_images/wjbefore.jpg"
              style="max-height:200px"
              alt
              preview="1"
              preview-text="整改前"
            />
          </div>

          <div class="label">整改后</div>
          <div class="label">
            <img
              class="img"
              src="../../../../../assets/cesium_images/wjafter.jpg"
              style="max-height:200px"
              alt
              preview="1"
              preview-text="整改前后"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeName: "first",
    };
  },
};
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
