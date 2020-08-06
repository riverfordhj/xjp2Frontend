<template>
  <hsc-window-style-metal>
    <hsc-window
      style="width:400px;height:500px;background:white"
      :title="title"
      :close-button="true"
      :is-open.sync="isOpen"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="基本信息"
          name="first"
        >基本信息</el-tab-pane>
        <el-tab-pane
          label="人员信息"
          name="second"
        >人员信息</el-tab-pane>
        <el-tab-pane
          label="地物信息"
          name="third"
        >地物信息</el-tab-pane>
        <el-tab-pane
          label="房屋信息"
          name="fourth"
        >房屋信息</el-tab-pane>
        <!-- <el-tab-pane label="房屋信息" name="fourth">房屋信息</el-tab-pane> -->
      </el-tabs>
    </hsc-window>

    <!-- <button @click="isOpen = ! isOpen">Toggle Window 1</button> -->
  </hsc-window-style-metal>
</template>

<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      default: '属性窗口'
    },
    opened: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      activeName: 'second'
    }
  },
  watch: {
    opened(newVal, oldVal) {
      this.isOpen = true
    }
  }
}
</script>
