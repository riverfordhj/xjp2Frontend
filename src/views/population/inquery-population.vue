
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="Address.filter" placeholder="过滤条件(小区)" style="width: 200px;" class="filter-item" @keyup.enter.native="handleLocalFilter" />
      <el-select v-model="Address.subdivsion" placeholder="小区" clearable style="width: 150px" class="filter-item" @change="getBuildingsData">
        <el-option v-for="item in filteredSubdivsions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="Address.building" placeholder="楼栋" clearable class="filter-item" style="width: 130px" @change="changeSelectedBuilding">
        <el-option v-for="item in filteredBuildings" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>
    <!-- 引入统计组件 -->
		<pivot-table-panel :statistical-data="persons"></pivot-table-panel>
  </div>

</template>

<script>
import pivotTablePanel from '@/components/pivotTablePanel.vue'
import { getSubdivsions, getBuildingsBySub, getRoomByBuilding, getPersons, getPersonsByBuilding } from '@/api/person.js'

export default {
	name: 'PersonStatistics',
	components:{
		pivotTablePanel
	},
  data() {
    return {
      subdivsions: [],
      buildings: [],
      persons: [],
      Address: {
        subdivsion: undefined,
        building: undefined,
        room: undefined,
        filter: ''
      },
    }
  },
  computed: {
    filteredSubdivsions() {
      // debugger
      if (this.Address.filter) {
        const value = this.Address.filter.split(/[，,]/g)
        return this.subdivsions.filter(item => item.name.indexOf(value[0]) !== -1)
      } else {
        return this.subdivsions
      }
    },
    filteredBuildings() {
      if (this.Address.filter) {
        const value = this.Address.filter.split(/[，,]/g)
        if (value[1])
          return this.buildings.filter(item => item.name.indexOf(value[1]) !== -1)
      }
      return this.buildings
    },
  },
  created() {
    this.getSubdivsionsData()
  },
  mounted() {
  },
  methods: {
    getSubdivsionsData() {
      getSubdivsions().then(response => {
        // debugger
        this.subdivsions = response
      }).catch(error => {
        console.log(error)
      })
    },
    getBuildingsData(subdivsionId) {
      // debugger
      getBuildingsBySub(subdivsionId).then(response => {
        // debugger
        this.buildings = response
      }).catch(error => {
        console.log(error)
      })
    },
    changeSelectedBuilding(buildingId) {
      // debugger
      getPersonsByBuilding(buildingId).then(response => {
        // debugger
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

