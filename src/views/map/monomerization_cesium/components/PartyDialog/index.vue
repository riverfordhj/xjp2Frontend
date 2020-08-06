<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="党员信息"
          name="first"
        >
          <peopleTable />
        </el-tab-pane>
        <el-tab-pane
          label="党员活动"
          name="second"
        >
          <activity />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import peopleTable from './people'
import activity from './activity/index'
export default {
  name: '',
  components: {
    peopleTable,
    activity
  },
  props: {
    partyopend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '党员建设',
      activeName: 'first',
      dialogVisible: false
    }
  },
  watch: {
    partyopend() {
      // debugger
      this.dialogVisible = true
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="" scoped>
</style>
