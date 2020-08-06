<template>
  <el-card class="box-card">
    <el-tree
      :data="tree_data"
      show-checkbox
      node-key="id"
      :default-checked-keys="defaultChecked"
      :expand-on-click-node="false"
    >
      <span
        slot-scope="{ node, data }"
        class="custom-tree-node"
      >
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      tree_data: []
    }
  }
}
</script>

<style lang="" scoped>
</style>
