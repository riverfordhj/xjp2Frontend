<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer" />
    <div class="mainMenu">
      <el-dropdown @command="handleMenuCommand">
        <el-button type="primary">
          基础功能
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showLayer">图层管理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <dialog-drag
      v-show="layerTreeVisible"
      id="dialog-1"
      class="dialog-3"
      title="图层目录"
      pinned="false"
      :options="{top:60, height: 350, width: 280, buttonPin: false }"
      @close="closeLayerTreePanel"
    >
      <el-scrollbar :native="false" style="height:100%">
        <el-tree
          show-checkbox
          :data="modelTreeData"
          :props="defaultProps"
          node-key="id"
          :default-expanded-keys="[1, 2]"
          :default-checked-keys="defaultChecked"
          :render-content="renderContent"
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
        />
      </el-scrollbar>
    </dialog-drag>

    <el-dialog title="图层设置" :visible.sync="dialogVisible" width="250px">
      <div class="block">
        <span class="demonstration">模型颜色:</span>
        <!-- <el-tag>模型颜色:</el-tag> -->
        <el-color-picker v-model="modelColor" show-alpha @change="colorChange" />
      </div>
    </el-dialog>

    <dialog-drag
      v-show="personHouseDataForm.show"
      id="dialog-2"
      class="dialog-3"
      :title="personHouseDataFormTitle"
      pinned="false"
      :options="{top:250, left:50, height: 500, width: 800, buttonPin: false }"
      @close="closepersonHouseDataForm"
    >
      <!-- <el-scrollbar :native="false" style="height:100%, height: 100%"> -->
      <el-table :data="personHouseDataForm.personInRoom" height="440" border style="width: 100%">
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

var Cesium = require('cesium/Cesium')

import 'cesium/Widgets/widgets.css'
import { interactOperate } from './interactivate3DTiles.js'

export default {
  name: 'PersonHouseMap',
  components: {
    DialogDrag
  },
  data() {
    return {
      viewer: null,
      sDTilesCollection: new Map(),

      layerTreeVisible: false,
      modelTreeData: [
        {
          id: 1,
          label: '实体模型',
          children: [
            {
              id: 11,
              label: '峯岚天下3栋',
              url: 'http://localhost/xjp/3D/saxc/saxc/tileset.json' // fftx/1building3DTiles
            }
          ]
        },
        {
          id: 2,
          label: '单体模型',
          children: [
            {
              id: 12,
              label: '峯岚天下3栋',
              url: 'http://localhost/xjp/3D/saxc/dth-SAXC/tileset.json' // fftx/dth3DTiles
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultChecked: [11, 12], // 模型树check状态

      dialogVisible: false, // 图层设置面试显示开关
      currentModelId: -1, // 当前被设置的模型id

      modelColor: null, // 模型颜色

      personHouseDataForm: {
        title: '人房数据页',
        show: false,
        roomid: '',
        personInRoom: []
        // {
        //   address: '武汉',
        //   company: '',
        //   ethnicGroups: '汉',
        //   isOverseasChinese: false,
        //   name: '陈谦',
        //   organizationalRelation: '',
        //   personId: '420802198306140315',
        //   phone: '13971349323',
        //   politicalState: ''
        // }
      }
    }
  },
  computed: {
    personHouseDataFormTitle() {
      return (
        this.personHouseDataForm.title +
        ' 房号：' +
        this.personHouseDataForm.roomid
      )
    }
  },
  mounted() {
    this.initMap()
    this.loadData()
  },
  methods: {
    initMap() {
      this.viewer = new Cesium.Viewer('cesiumContainer', {
        shouldAnimate: true,
        baseLayerPicker: false,
        fullscreenButton: false,
        sceneModePicker: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        animation: false,
        // infoBox: false,
        requestRenderMode: true
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //   url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=b97312f85a240009c717a8480b6d54d2',
        //   layer: 'tdtBasicLayer',
        //   style: 'default',
        //   format: 'image/jpeg',
        //   tileMatrixSetID: 'GoogleMapsCompatible',
        //   show: false
        // }) // 天地图影像
        // terrainProvider: Cesium.createWorldTerrain() //建议不要加载全球地形
      })
    },
    loadData() {
      // 加载倾斜测量模型
      this.modelTreeData[0].children.forEach((element) => {
        this.load3DTiles(
          this.viewer,
          element.id,
          element.url,
          true,
          null,
          null
        )
      })
      console.log('原始倾斜测量模型加载完成')

      this.modelTreeData[1].children.forEach((element) => {
        this.load3DTiles(
          this.viewer,
          element.id,
          element.url,
          true,
          Cesium.ClassificationType.CESIUM_3D_TILE,
          new Cesium.Cesium3DTileStyle({
            color: 'rgba(255,255,255,0.01)'
          })
        )
      })
    },

    load3DTiles(viewer, mouldId, url, isFlyto, classificationType, style) {
      var tiltTileset = null

      if (classificationType) {
        // debugger;
        tiltTileset = new Cesium.Cesium3DTileset({
          url: url
          // classificationType: classificationType,
        })
      } else {
        tiltTileset = new Cesium.Cesium3DTileset({
          url: url
          // classificationType: classificationType,
        })
      }

      // tiltTileset.classificationType = classificationType;
      tiltTileset.style = style

      const self = this

      tiltTileset.readyPromise.then((tileset) => {
        viewer.scene.primitives.add(tileset)
        if (isFlyto) viewer.flyTo(tileset)

        self.sDTilesCollection.set(mouldId, tiltTileset)
        // debugger
        // 设置3D模型mouse事件交互
        if (style) {
          interactOperate.install(self.viewer, self.personHouseDataForm)
        }
      })
    },
    // 处理菜单事件
    handleMenuCommand(command) {
      if (command === 'showLayer') {
        this.layerTreeVisible = true
      }
    },
    // 关闭图层面板
    closeLayerTreePanel() {
      this.layerTreeVisible = false
    },
    closepersonHouseDataForm() {
      this.personHouseDataForm.show = false
    },
    handleCheckChange(data, checked, indeterminate) {
      // debugger;
      var target = this.sDTilesCollection.get(data.id)
      if (Cesium.defined(target)) {
        target.show = checked
        // target.then(function (dataSource) {
        //   dataSource.entities.show = checked;
        //   return;
        // });
      }
      // var target = this.jsonLayers.get(data.label)

      // if (!Cesium.defined(target)) {
      //   target = this.tileSets.get(data.label)
      // }
      // if (!Cesium.defined(target)) {
      //   return
      // }
      // target.then(function(dataSource) {
      //   dataSource.entities.show = checked
      // })
      // }
    },
    handleNodeClick(data) {
      var target = this.sDTilesCollection.get(data.id)
      if (Cesium.defined(target)) {
        this.viewer.flyTo(target)
      }
    },

    // 渲染模型tree
    renderContent(h, { node, data }) {
      // debugge
      // var icon = ['type', 'layer']

      if (node.level === 1) {
        return (
          <span class='custom-tree-node'>
            <span>
              <svg-icon style='margin-right:8px' icon-class='type' />
              <span>{node.label}</span>
            </span>
          </span>
        )
      }
      return (
        <span class='custom-tree-node'>
          <span>
            <svg-icon style='margin-right:8px' icon-class='layer' />
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              v-show={node.checked}
              size='mini'
              type='text'
              on-click={(event) => {
                this.openTPanel(node, data, event)
              }}
            >
              设置
            </el-button>
          </span>
        </span>
      )
    },
    // 打开图层设置面板
    openTPanel(node, data, event) {
      event.stopPropagation()
      // console.log(node, data)
      debugger
      var self = this
      this.currentModelId = data.id // 记录当前设置模型id
      var target = this.sDTilesCollection.get(this.currentModelId)
      if (Cesium.defined(target)) {
        self.modelColor = target.style.color.expression
        self.dialogVisible = true
      }
      // target.then(function (dataSource) {
      //   console.log(dataSource);
      //   var alpha =
      //     dataSource.entities.values[0].polygon.material.color._value.alpha;
      //   self.transparency = alpha;
      //   // debugger
      //   self.SelectedDataSource = dataSource;
      //   self.dialogVisible = true;
      // });
    },
    // 模型透明度滑块控件事件映射
    sliderChange() {
      // debugger;
      var target = this.sDTilesCollection.get(this.currentModelId)
      if (Cesium.defined(target)) {
        target.style = new Cesium.Cesium3DTileStyle({
          color: `rgba(255,255,255,"${this.transparency}")`
        })
      }
    },
    colorChange() {
      debugger
      var target = this.sDTilesCollection.get(this.currentModelId)
      if (Cesium.defined(target)) {
        target.style = new Cesium.Cesium3DTileStyle({
          color: this.modelColor
        })
      }
    }
  }
}
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
/* lang="scss" */
#cesiumContainer {
  height: calc(100vh - 84px);
}
.mainMenu {
  left: 10px;
  top: 10px;
  position: absolute;
  z-index: 991;
}
</style>
