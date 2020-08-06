<template>
  <el-tabs
    v-model="activeName"
    class="tabs"
  >
    <el-tab-pane
      label="基础信息"
      name="first"
    >
      <BasicInformation
        :people="peopleNumber"
        :houses="housesNumber"
      />
    </el-tab-pane>
    <el-tab-pane
      label="层次结构"
      name="second"
    >
      <tree />
    </el-tab-pane>
    <el-tab-pane
      label="房屋信息"
      name="third"
    >
      <House-Table :houses="houses" />
    </el-tab-pane>
    <el-tab-pane
      label="人员信息"
      name="fourth"
    >
      <people-table :people="people" />
    </el-tab-pane>
    <el-tab-pane
      label="统计分析"
      name="fifth"
      :lazy="chartPanel"
    >
      <Chart />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import BasicInformation from './BasicInformation'
import Tree from './Tree'
import HouseTable from './HouseTable'
import PeopleTable from './PeopleTable'
import Chart from './Chart'
import { getPeopleByBuilding } from '@/api/people.js'
import { getHousesByBuildingName } from '@/api/house.js'

export default {
  name: '',
  components: {
    BasicInformation,
    Tree,
    HouseTable,
    PeopleTable,
    Chart
  },
  props: {
    title: {
      type: String,
      default: 'G12-1'
    }
  },
  data() {
    return {
      activeName: 'first',
      chartPanel: true,
      people: [],
      houses: [],
      peopleNumber: 0,
      housesNumber: 0
    }
  },
  mounted() {
    getPeopleByBuilding(this.title).then(res => {
      this.people = res.data
      this.peopleNumber = this.people.length
    })
    getHousesByBuildingName(this.title).then(res => {
      this.houses = res.data
      this.housesNumber = this.houses.length
    })
  }
}
</script>

<style scoped>
.tabs {
  height: 500px;
}
</style>
