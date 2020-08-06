<template>
  <div class="tree">
    <el-scrollbar
      :native="false"
      style="height:420px"
    >
      <el-tree
        :props="props"
        :load="loadNode"
        :data="treeData"
        lazy
        show-checkbox
        :render-content="renderContent"
      />
    </el-scrollbar>
  </div>

</template>

<script>
import { getPeopleByResidents } from '@/api/people.js'
import { getHousesByBuilding } from '@/api/house.js'
import { getBuildingByName } from '@/api/building.js'
export default {
  name: 'Tree',
  props: {
    title: {
      type: String,
      default: 'G12-1'
    }
  },
  data() {
    return {
      props: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf'
      },
      treeData: [],
      HouseMap: new Map()
    }
  },
  mounted() {
    getBuildingByName(this.title).then(res => {
      getHousesByBuilding(res.data.BuildingId).then(res => {
        res.data.map(d => {
          this.treeData.push({
            label: d.HouseNumber,
            className: 'house'
          })

          this.HouseMap.set(d.HouseNumber, d.HouseId)
        })
      })
    })
  },
  methods: {
    renderContent(h, { node, data, store }) {
      if (node.level === 1) {
        return (
          <span class='custom-tree-node'>
            <span>
              <svg-icon style='margin-right:8px' icon-class='house' />
              <span>{node.label}</span>
            </span>
          </span>
        )
      }
      if (node.level === 2) {
        return (
          <span class='custom-tree-node'>
            <span>
              <svg-icon style='margin-right:8px' icon-class='peoples' />
              <span>{node.label}</span>
            </span>
          </span>
        )
      }
    },
    loadNode(node, resolve) {
      if (node.level === 1) {
        getPeopleByResidents(this.HouseMap.get(node.data.label)).then(res => {
          var arr = []
          res.data.map(d => {
            if (d.Bhead) {
              arr.push({
                label: d.Name + ' 户主',
                leaf: true
              })
            } else {
              arr.push({
                label: d.Name,
                leaf: true
              })
            }
          })
          resolve(arr)
        })
      }
    }
  }
}
</script>

<style scoped>
.tree {
  height: 100%;
}
</style>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

