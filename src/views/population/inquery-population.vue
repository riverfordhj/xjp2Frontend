
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="Address.filter" placeholder="过滤(社区，网格，楼栋)" style="width: 200px;" class="filter-item" @keyup.enter.native="handleLocalFilter" />
      <el-select v-model="Address.community" placeholder="社区" clearable style="width: 100px" class="filter-item" @change="getNetGridData">
          <el-option v-for="item in filteredCommunities" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="Address.netGrid" placeholder="网格" clearable style="width: 100px" class="filter-item" @change="SelectedNetGrid" >
          <el-option v-for="item in filteredNetGrids" :key="item.id" :label="'网格' + item.name" :value="item.id" />
      </el-select>
      <el-select v-model="Address.building" placeholder="楼栋" clearable class="filter-item" style="width: 150px" @change="changeSelectedBuilding">
          <el-option v-for="item in filteredBuildings" :key="item.id" :label="item.address + '-' + item.name + '栋'" :value="item.id" />
      </el-select>
    </div>
    <!-- 引入统计组件 -->
		<pivot-table-panel :statistical-data="persons" :default-settings = "defaultSettingsForPivot"></pivot-table-panel>
  </div>

</template>

<script>
import pivotTablePanel from '@/components/pivotTablePanel.vue'
import { getCommunitys, getNetGridInCommunity,getBuildingInNetGrid, GetPersonsByNetGrid_ZH,GetPersonsByBuilding_ZH } from '@/api/person.js'

export default {
	name: 'PersonStatistics',
	components:{
		pivotTablePanel
	},
  data() {
    return {
      communities:[],
      netGrids:[],
      subdivsions: [],
      buildings: [],
      persons: [],
      Address: {
        community:'',
        netGrid:'',
        building: '',
        room: undefined,
        filter: ''
			},

			defaultSettingsForPivot: {
				rows: ['楼栋名'],
				cols: ['人口性质'],
				aggregatorName: '频数',
				rendererName: '柱形图'
			}
    }
  },
  computed: {
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
          const value = this.Address.filter.split(/[，,]/g)
          if (value[2]) { 
            return this.buildings.filter(item => item.name.indexOf(value[2]) !== -1) 
          }
      }
      //debugger
      return this.buildings
		},
  },
  created() {
    this.getCommunitysData()
		//初始化请求网格1
		//this.getBuildingsData(1);
		this.changeSelectedNetGrid(1);
  },
  mounted() {
  },
  methods: {
    SelectedNetGrid(item){
          this.getBuildingsData(item);
          this.changeSelectedNetGrid(item);
    },
    getCommunitysData() {
      getCommunitys().then(response => {
        this.communities = response
      }).catch(error => {
        console.log(error)
      })
    },
     getNetGridData(item) {
      if (!item) { // 如果取消社区选取
        this.netGrids = []
        return
      }
      getNetGridInCommunity(item).then(response => {
        this.netGrids = response
      }).catch(error => {
        console.log(error)
      })
    },
    getBuildingsData(item) {
      if (!item) { // 如果取消网格选取
        this.buildings = []
        return
      }
      getBuildingInNetGrid(item).then(response => {
        this.buildings = response
      }).catch(error => {
        console.log(error)
      })
    },
    changeSelectedNetGrid(netGridId){
      GetPersonsByNetGrid_ZH(netGridId).then(response =>{
        debugger
        this.persons = response
      }).catch(error => {
        console.log(error)
      })
    },
    changeSelectedBuilding(buildingId) {
      GetPersonsByBuilding_ZH(buildingId).then(response => {
        debugger
        this.persons = response
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style >
</style>

