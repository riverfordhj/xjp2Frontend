<template>
  <div v-show="personHouseInfo.show">
    <dialog-drag
      id="dialog-1"
      class="dialog-3"
      :title="personHouseDataFormTitle"
      pinned="false"
      :options="option"
      @close="close"
    >
      <!-- <el-scrollbar :native="false" style="height:100%, height: 100%">-->
      <div class="filter-container">
        <el-input v-model="Address.filter" placeholder="过滤(社区，网格，楼栋)" style="width: 180px;" class="filter-item" />
        <el-select v-model="Address.community" placeholder="社区" clearable style="width: 100px" class="filter-item" @change="getNetGridData">
          <el-option v-for="item in filteredCommunities" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select v-model="Address.netGrid" placeholder="网格" clearable style="width: 100px" class="filter-item" @change="getBuildingsData">
        <el-option v-for="item in filteredNetGrids" :key="item.id" :label="'网格' + item.name" :value="item.id" />
      </el-select>
        <el-select v-model="Address.building" placeholder="楼栋" clearable class="filter-item" style="width: 150px" @change="getRoomsData">
          <el-option v-for="item in filteredBuildings" :key="item.id" :label="item.address + '-' + item.name + '栋'" :value="item.id" />
        </el-select>
        <el-select v-model="Address.room" style="width: 140px"  class="filter-item" @change="flyToRoom">
          <el-option v-for="item in filteredRooms" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>      
      </div>
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
  </div>

</template>

<script>
import DialogDrag from 'vue-dialog-drag'

import { getCommunitys, getNetGridInCommunity,getBuildingInNetGrid, getRoomByBuilding, getPersons, getPersonsByBuilding } from '@/api/person.js'
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
      communities:[],
      netGrids:[],
      buildings: [],
      cureentBuildingName: '', // 当前选择building’s name
      rooms: [],
      Address: {
        community:'',
        netGrid:'',
        building: '',
        room: '',
        filter: ''
			}
    }
  },

  computed: {
    personHouseDataFormTitle() {
      return this.personHouseInfo.title + ' 房号：' + this.personHouseInfo.roomid;
      
    },
    filteredCommunities() {
       //debugger
      if (this.Address.filter) {
      	//debugger;
        const value = this.Address.filter.split(/[，,]/g)
        return this.communities.filter(item => item.name.indexOf(value[0]) !== -1)
      } else {
        return this.communities
      }
    },
    filteredNetGrids() {
       //debugger
      if (this.Address.filter) {
        	//debugger;
        const value = this.Address.filter.split(/[，,]/g)
        if (value[1]){
         // debugger
          return this.netGrids.filter(item => item.name.indexOf(value[1]) !== -1)
          }
      } 
       return this.netGrids       
    },
    filteredBuildings() {
     // debugger
      if (this.Address.filter) {
       // debugger
        const value = this.Address.filter.split(/[，,]/g)
        if (value[2]) { 
          return this.buildings.filter(item => item.name.indexOf(value[2]) !== -1) 
          }
      }
      //debugger
      return this.buildings
		},
    filteredRooms() {
      if (this.Address.filter) {
        const value = this.Address.filter.split(/[，,]/g)
        if (value[3])
          return this.rooms.filter(item => item.name.indexOf(value[3]) !== -1)
      }
      return this.rooms
    }
  },
  watch: {},
  created() {
     this.getCommunitysData()
  },
  mounted(){
    this.bus.$on('transferRoomId',(position,roomname)=>{
         debugger
         this.personHouseInfo.interactOperate.FlytoRoom(position, roomname)
         
          
    })
  },
  methods: {
      getCommunitysData() {
      getCommunitys().then(response => {
        this.communities = response
      }).catch(error => {
        console.log(error)
      })
    },
     getNetGridData(item) {
      // debugger
      if (!item) { // 如果取消社区选取
        this.clearInfo();
        return
      }
      getNetGridInCommunity(item).then(response => {
         //debugger
        this.netGrids = response
      }).catch(error => {
        console.log(error)
      })
    },
    getBuildingsData(item) {
      // debugger
      if (!item) { // 如果取消网格选取
        //this.buildings = []
        this.clearInfonetGrid();
        return
      }
      getBuildingInNetGrid(item).then(response => {
        // debugger
        this.buildings = response
      }).catch(error => {
        console.log(error)
      })
    },
    getRoomsData(id) {
      debugger
     // const building = this.buildings.find(r => r.id === id)
     // this.cureentBuildingName = building.name // 保持当前选择building’s name
      if(!id){
        this.clearInfobuilding();
      }
      getRoomByBuilding(id).then(response => {
        // debugger
        this.rooms = response
      }).catch(error => {
        // debugger
        console.log(error)
      })
    },
    
    flyToRoom(roomId) {
      debugger
			//定位飞行过程中，信息面板设为不可见
			this.personHouseInfo.show = false;
      const room = this.rooms.find(r => r.id === roomId)
      if (room) {
        const position = { // 70-2-1002
          long: room.longitude,
          lat: room.latitude,
          height: room.height
        }
        this.personHouseInfo.interactOperate.FlytoRoom(position, room.name)
      }
    },
      clearInfonetGrid (){
       this.Address.netGrid = '';
       this.Address.building = '';
       this.Address.room = '';
    },
     clearInfobuilding (){
       this.Address.building = '';
       this.Address.room = '';
    },
    clearInfo (){
       this.Address.community = '';
       this.Address.netGrid = '';
       this.Address.building = '';
       this.Address.room = '';
    },
    close() {
      this.personHouseInfo.show = false;
      this.clearInfo();
		},
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
</style>
