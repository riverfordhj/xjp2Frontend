<!--
 * @Descripttion:
 * @version:
 * @Author: KanMing
 * @Date: 2019-09-24 16:33:10
 * @LastEditors: KanMing
 * @LastEditTime: 2019-09-24 17:00:12
 -->
<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-submenu index="1">
        <template slot="title">基础</template>
        <el-menu-item index="1-1">空间数据管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      activeIndex: 1
    }
  }
}
</script>

<style lang="" scoped>
</style>
