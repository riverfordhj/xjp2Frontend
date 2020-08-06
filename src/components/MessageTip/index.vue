<template>
  <el-badge
    :value="2"
    type="info"
    title="消息"
  >
    <el-popover
      placement="top"
      width="400"
      trigger="click"
    >
      <el-table :data="gridData">
        <el-table-column
          width="150"
          property="type"
          label="事件类型"
          align="center"
        />
        <el-table-column
          width="100"
          property="name"
          label="事件名称"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click.once="checkProcess(scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        slot="reference"
        class="share-button"
        icon="el-icon-message"
        size="small"
        type="primary"
        circle
      />
    </el-popover>
  </el-badge>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      noteLength: 0,
      visible2: false,
      gridData: [{
        type: '紧急事件',
        name: '火灾'
      }, {
        type: '日常',
        name: '老年证办理'
      }]
      // gridData1: [{
      //   type: '日常',
      //   name: '老年证办理'
      // },]
    }
  },
  methods: {
    checkProcess(row) {
      if (row.name === '老年证办理') {
        this.$router.push({ path: `/map/oldMen` })
      } else {
        this.$router.push({ path: `/map/monomerization_cesium` })
      }
    }
  }
}
</script>

<style lang="" scoped>
</style>
