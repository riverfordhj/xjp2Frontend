<template>
  <el-container class="main">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="">Aside</el-aside>
      <el-main>Main</el-main>
      <el-aside width="">Aside</el-aside>

    </el-container>
  </el-container>
</template>

<script>
export default {
  name: '',
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.main {
  height: calc(100vh - 84px);
}
</style>
