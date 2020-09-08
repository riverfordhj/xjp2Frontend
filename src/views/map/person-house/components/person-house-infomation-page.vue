<template>
  <dialog-drag
    v-show="personHouseInfo.show"
    id="dialog-2"
    class="dialog-3"
    :title="personHouseDataFormTitle"
    pinned="false"
    :options="option"
    @close="close"
  >
    <!-- <el-scrollbar :native="false" style="height:100%, height: 100%"> -->
    <el-table :data="personHouseInfo.personInRoom" height="290" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="80" />
      <el-table-column prop="personId" label="身份证" width="170" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="ethnicGroups" label="民族" />
      <el-table-column prop="address" label="户籍地址" />
      <el-table-column prop="company" label="公司" />
      <el-table-column prop="isOverseasChinese" label="海外华人" />
      <el-table-column prop="politicalState" label="政治面貌" />
      <el-table-column prop="organizationalRelation" label="组织关系" />
    </el-table>
    <!-- </el-scrollbar> -->
  </dialog-drag>
</template>

<script>
import DialogDrag from 'vue-dialog-drag'

export default {
  name: 'PersonHouseInfomationPage',
  components: {
    DialogDrag
  },
  props: {
    personHouseInfo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      option: { top: 250, left: 20, height: 350, width: 800, buttonPin: false }
    }
  },
  computed: {
    personHouseDataFormTitle() {
      return (
        this.personHouseInfo.title + ' 房号：' + this.personHouseInfo.roomid
      )
    }
  },
  watch: {},
  methods: {
    close() {
      this.personHouseInfo.show = false
    }
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
</style>
