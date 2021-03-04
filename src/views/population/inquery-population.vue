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

    <div id="output" style="margin: 30px;" />
  </div>

</template>

<script>
const $ = require('jquery')
import 'jqueryui/jquery-ui'
// import jquery from 'jquery'
import 'pivottable/dist/pivot.css'
import 'pivottable'
import d3 from 'd3'
import c3 from 'c3'
import {c3_renderers} from './c3_renderers'

import { getSubdivsions, getBuildingsBySub, getRoomByBuilding, getPersons, getPersonsByBuilding } from '@/api/person.js'

export default {
  name: 'PersonStatistics',
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
      renderers: null
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
    c3_renderers.call(this, $, c3)
    this.renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers)

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
        // debugger
        console.log(error)
      })
    },
    getBuildingsData(subdivsionId) {
      // debugger
      getBuildingsBySub(subdivsionId).then(response => {
        // debugger
        this.buildings = response
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    changeSelectedBuilding(buildingId) {
      // debugger
      getPersonsByBuilding(buildingId).then(response => {
        // debugger
        this.persons = response
        this.setPivot()
      }).catch(error => {
        debugger
        console.log(error)
      })
    },
    setPivot() {
      const self = this
      // debugger
      // const pivotUIT = pivottable;
      $('#output').pivotUI(
        this.persons,
        {
          renderers: self.renderers
        }
        // [
        //   { color: 'blue', shape: 'circle' },
        //   { color: 'red', shape: 'triangle' }
        // ],
        // {
        //   rows: ['color'],
        //   cols: ['shape']
        // }
      )
    }
  }
}
</script>

<style >

</style>
