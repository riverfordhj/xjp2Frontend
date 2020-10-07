<template>
<div v-show="personHouseInfo.show">
<button @click="flyToPosition">定位</button>
<dialog-drag
    id="dialog-2"
    class="dialog-3"
    :title="personHouseDataFormTitle"
    pinned="false"
    :options="option"
    @close="close"
  >
    <!-- <el-scrollbar :native="false" style="height:100%, height: 100%"> -->
    <el-input v-model="searchPositionValue" placeholder="房号" style="width: 500px;" class="filter-item" @keyup.enter.native="handleRoomSearch" />
    <el-table :data="personHouseInfo.personInRoom" height="350" border style="width: 100%">
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
<<<<<<< HEAD
=======
</div>
  
>>>>>>> origin/NetEnd
</template>

<script>
import DialogDrag from 'vue-dialog-drag'

// import { interactOperate } from '../interactivate3DTiles.js'

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
      option: { top: 250, left: 20, height: 450, width: 800, buttonPin: false },
      searchPositionValue: '114.336181640625,30.577966690063477,41,70-2-1002'
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
    handleRoomSearch() {
<<<<<<< HEAD
      // debugger
=======
      // debuggert
>>>>>>> origin/NetEnd
      const data = this.searchPositionValue.split(',')
      const position = { // 70-2-1002
        long: Number(data[0]),
        lat: Number(data[1]),
        height: Number(data[2])
      }
      this.personHouseInfo.interactOperate.FlytoRoom(position, data[3])
    },
    close() {
      this.personHouseInfo.show = false
<<<<<<< HEAD
    }
=======
		},
		flyToPosition() {
			
		}
>>>>>>> origin/NetEnd
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
</style>
