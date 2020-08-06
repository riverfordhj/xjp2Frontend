<!--
 * @Descripttion:test
 * @version:1
 * @Author: KanMing
 * @Date: 2019-09-24 15:07:51
 * @LastEditors: KanMing
 * @LastEditTime: 2019-09-25 22:02:10
 -->
<template>
  <div id="cesiumDiv">
    <div id="cesiumContainer" ref="cesiumContainer" />
    <div class="mainMenu">
      <!-- <hsc-menu-style-white>
        <hsc-menu-bar style="border-radius: 0 0 4pt 0;">
          <hsc-menu-bar-item label="基础">
            <hsc-menu-item label="图层管理" @click="openLayerTreePanel" />
          </hsc-menu-bar-item>
        </hsc-menu-bar>
      </hsc-menu-style-white>-->
      <el-dropdown @command="handleMenuCommand">
        <el-button type="primary">
          基础
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
          :data="layerTreeData"
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
    <Cesium-tooltip
      :title="tooltipParams.title"
      :opened="tooltipParams.opened"
      :layer-type="tooltipParams.layerType"
      :left="tooltipParams.left"
      :top="tooltipParams.top"
    />
    <!-- <div id="menu">
      <el-card class="box-card">
        <el-tree
          class="tree"
          :data="tree_data"
          show-checkbox
          node-key="id"
          :render-content="renderContent"
          :default-checked-keys="defaultChecked"
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
        />
      </el-card>
    </div>-->
    <div>
      <!-- <cesium-window
        :title="windowParams.title"
        :opened="windowParams.opened"
      />-->
      <cesium-dialog
        :title="windowParams.title"
        :opened="windowParams.opened"
        :layer-type="windowParams.layerType"
      />
    </div>
    <div class="footer">
      <div id="mouseHeightDiv" class="footerItem">鼠标高度:{{ cesiumObjs.mHeight }}米</div>
      <div id="windowHeightDiv" class="footerItem">视窗高度:{{ cesiumObjs.wHeight }}米</div>
      <div id="latitudeDiv" class="footerItem">纬度:{{ cesiumObjs.latitude }}度</div>
      <div id="longitudeDiv" class="footerItem">经度:{{ cesiumObjs.longitude }}度</div>
    </div>
    <el-dialog title="图层设置" :visible.sync="dialogVisible">
      <div class="block">
        <span class="demonstration">选择透明度</span>
        <el-slider
          v-model="transparency"
          input-size="small"
          :step="0.1"
          :max="max"
          show-stops
          @change="sliderChange"
        >123</el-slider>
      </div>
      <!-- <div class="block">
        <span class="demonstration">开关标注</span>
        <el-switch
          v-model="labelValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >1
        </el-switch>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import DialogDrag from "vue-dialog-drag";
// import Cesium from "cesium/Cesium";
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import CesiumNavigation from "cesium-navigation-es6";
// import CesiumWindow from './components/CesiumWindow'
import CesiumDialog from "./components/CesiumDialog";
import CesiumTooltip from "./components/CesiumTooltip";
// import LayerTree from './components/LayerTree'
import {
  initCesium,
  initInfoBox,
  initTooltip,
  loadJsonLayer,
  FlyToJsonLayer,
} from "./cesium.js";

import { featureViewer, add3dTiles } from "@/utils/tilesSet";

import communityJson from "@/assets/geojson/社区.json";
import saxc_Building_Json from "@/assets/geojson/json_水岸星城/建筑_水岸星城2.json";
import saxc_grid_Json from "@/assets/geojson/json_水岸星城/网格_水岸星城.json";
import hubu_Building_Json from "@/assets/geojson/json_湖北大学/建筑_湖北大学.json";
import hubu_grid_Json from "@/assets/geojson/json_湖北大学/网格_湖北大学.json";

import tileSetsJson from "@/assets/json/tiles.json";
import tileSets_dtJson from "@/assets/json/tiles_dt.json";

var viewer;
var tileSets = new Map();
var tileSets_dt = new Map();

export default {
  name: "",
  components: {
    DialogDrag,
    // CesiumWindow,
    CesiumDialog,
    CesiumTooltip,
    // LayerTree
  },
  data() {
    return {
      cesiumObjs: {
        // viewer: undefined,
        mHeight: undefined,
        wHeight: undefined,
        latitude: undefined,
        longitude: undefined,
      },
      windowParams: {
        title: "",
        opened: false,
        layerType: "",
      },
      tooltipParams: {
        title: "",
        opened: false,
        layerType: "",
        left: 0,
        top: 0,
      },
      tree_data: [
        {
          id: 1,
          label: "社区",
          // icon: 'layer'
        },
        {
          id: 2,
          label: "网格_水岸星城",
        },
        {
          id: 3,
          label: "网格_湖北大学",
        },
        {
          id: 4,
          label: "建筑_水岸星城",
        },
        {
          id: 5,
          label: "建筑_湖北大学",
        },
      ],
      defaultChecked: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      jsonLayers: new Map(),
      dialogVisible: false,
      transparency: 0,
      labelValue: true,
      max: 1,
      SeectedDataSource: [],
      layerTreeVisible: false,
      layerTreeData: [
        {
          id: 1,
          label: "矢量",
          children: [
            {
              id: 3,
              label: "社区",
            },
            {
              id: 4,
              label: "网格_水岸星城",
            },
            {
              id: 5,
              label: "网格_湖北大学",
            },
            {
              id: 6,
              label: "建筑_水岸星城",
            },
            {
              id: 7,
              label: "建筑_湖北大学",
            },
          ],
        },
        {
          id: 2,
          label: "模型",
          children: [
            {
              id: 8,
              label: "水岸星城社区",
            },
            {
              id: 9,
              label: "湖北大学社区",
            },
            {
              id: 10,
              label: "秦臻路社区",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    this.init();
    this.loadJson();
  },
  methods: {
    init() {
      viewer = initCesium(viewer, this.cesiumObjs, CesiumNavigation);
      initInfoBox(viewer, this.windowParams);
      initTooltip(viewer, this.tooltipParams);
      this.load3dTiles();
    },
    load3dTiles() {
      featureViewer.install(viewer);
      tileSetsJson.map((config, i) => {
        // if (true) {
        var tileSet = add3dTiles(viewer, config.url, "tiles");
        tileSets.set(config.name, tileSet);
        // }
      });
      tileSets_dtJson.map((config) => {
        var tileSet = add3dTiles(viewer, config.url);
        tileSets_dt.set(config.name, tileSet);
      });
    },
    loadJson() {
      var communityLayer = loadJsonLayer(
        viewer,
        communityJson,
        "社区",
        (entity) => {
          entity.name = entity.properties.name_1;
          this.setEntityLabel(entity, 9000);
        }
      );
      var SaxcGridLayer = loadJsonLayer(
        viewer,
        saxc_grid_Json,
        "网格_水岸星城",
        (entity) => {
          entity.name = entity.properties.grid_name;
          this.setEntityLabel(entity, 5000);
        }
      );
      var HubuGridLayer = loadJsonLayer(
        viewer,
        hubu_grid_Json,
        "网格_湖北大学",
        (entity) => {
          entity.name = entity.properties.grid_name;
          this.setEntityLabel(entity, 5000);
        }
      );
      var SaxcBuilingLayer = loadJsonLayer(
        viewer,
        saxc_Building_Json,
        "建筑_水岸星城",
        (entity) => {
          entity.name = entity.properties["楼栋号"];
          this.setEntityLabel(entity, 1500);
        }
      );
      var HubuBuilingLayer = loadJsonLayer(
        viewer,
        hubu_Building_Json,
        "建筑_湖北大学",
        (entity) => {
          entity.name = entity.properties.name;
          this.setEntityLabel(entity, 1500);
        }
      );

      FlyToJsonLayer(communityLayer, viewer);
      this.jsonLayers.set("社区", communityLayer);
      this.jsonLayers.set("网格_水岸星城", SaxcGridLayer);
      this.jsonLayers.set("网格_湖北大学", HubuGridLayer);
      this.jsonLayers.set("建筑_水岸星城", SaxcBuilingLayer);
      this.jsonLayers.set("建筑_湖北大学", HubuBuilingLayer);
    },
    setEntityLabel(entity, distance) {
      entity.label = {
        text: entity.name,
        showBackground: true,
        scale: 0.6,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigi: Cesium.VerticalOrigin.BOTTOM,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          10.0,
          distance
        ),
        disableDepthTestDitance: 100.0,
        eyeOffset: new Cesium.Cartesian3(0.0, 100.0, 0.0),
      };
    },
    handleCheckChange(data, checked, indeterminate) {
      var target = this.jsonLayers.get(data.label);
      if (Cesium.defined(target)) {
        target.then(function (dataSource) {
          dataSource.entities.show = checked;
          return;
        });
      } else {
        target = tileSets.get(data.label);
      }
      if (Cesium.defined(target)) {
        target.show = checked;
      } else {
        return;
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
      var target = this.jsonLayers.get(data.label);
      if (!target) {
        return;
      }
      // if (data.label.match('模型')) {
      //   FlyTo_TileSet(target,viewer)
      // } else {
      FlyToJsonLayer(target, viewer);
      // }
    },
    openTPanel(node, data, event) {
      event.stopPropagation();
      // console.log(node, data)
      var self = this;
      var target = this.jsonLayers.get(data.label);
      if (!Cesium.defined(target)) {
        return;
      }
      target.then(function (dataSource) {
        console.log(dataSource);
        var alpha =
          dataSource.entities.values[0].polygon.material.color._value.alpha;
        self.transparency = alpha;
        // debugger
        self.SelectedDataSource = dataSource;
        self.dialogVisible = true;
      });
    },
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span class='custom-tree-node'>
    //       <span>
    //         <svg-icon style='margin-right:8px' icon-class='layer' />
    //         <span>{node.label}</span>
    //       </span>
    //       <span>
    //         <el-button
    //           size='mini'
    //           type='text'
    //           on-click={event => {
    //             this.openTPanel(node, data, event)
    //           }}
    //         >
    //           设置
    //         </el-button>
    //       </span>
    //     </span>
    //   )
    // },
    sliderChange() {
      Cesium.Math.setRandomNumberSeed(0);
      this.SelectedDataSource.entities.values.map((v) => {
        v.polygon.material = Cesium.Color.fromRandom({
          alpha: this.transparency,
        });
        // debugger
      });
    },
    openLayerTreePanel() {
      // debugger;
      this.layerTreeVisible = true;
    },
    handleMenuCommand(command) {
      if (command == "showLayer") {
        this.layerTreeVisible = true;
      }
    },
    closeLayerTreePanel() {
      this.layerTreeVisible = false;
    },
    renderContent(h, { node, data }) {
      // debugge
      // var icon = ['type', 'layer']

      if (node.level === 1) {
        return (
          <span class="custom-tree-node">
            <span>
              <svg-icon style="margin-right:8px" icon-class="type" />
              <span>{node.label}</span>
            </span>
          </span>
        );
      }
      return (
        <span class="custom-tree-node">
          <span>
            <svg-icon style="margin-right:8px" icon-class="layer" />
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              v-show={node.checked}
              size="mini"
              type="text"
              on-click={(event) => {
                this.openTPanel(node, data, event);
              }}
            >
              设置
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
/* @import "~@/cesium/Widgets/widgets.css"; */
#cesiumContainer {
  height: calc(100vh - 84px);
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.footer {
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: absolute;
  z-index: 991;
  padding: 3px 10px;
  font-size: 13px;
  color: #e9e9e9;
  text-shadow: 2px 2px 2px #000;
  background-color: rgba(0, 0, 0, 0.4);
}

.footerItem {
  float: right;
  min-width: 80px;
  margin-right: 20px;
  font-size: 13px;
  color: #e9e9e9;
  text-shadow: 2px 2px 2px #000;
}

.tooltip {
  color: #e9e9e9;
  text-shadow: 2px 2px 2px #000;
  background-color: rgba(0, 0, 0, 0.4);
  display: none;
}

#menu {
  position: absolute;
  left: 10px;
  top: 10px;
}

.tree {
  width: 250px;
}

.block {
  padding: 30px 24px;
  overflow: hidden;
  border-bottom: 1px solid #eff2f6;
}

.demonstration {
  font-size: 14px;
  color: #8492a6;
  line-height: 44px;
}

.demonstration + .el-slider {
  float: right;
  width: 70%;
  margin-right: 20px;
}

.demonstration + .el-switch {
  float: right;
  margin-right: 20px;
}

.mainMenu {
  left: 10px;
  top: 10px;
  position: absolute;
  z-index: 991;
}
</style>

<style>
.cesium-widget-credits {
  display: none !important;
  visibility: hidden !important;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

<style>
.dialog-3.dialog-drag .dialog-header {
  background-color: #304156;
}
.dialog-3.dialog-drag {
  background-color: white;
}
.dialog-drag .dialog-body {
  height: calc(100vh - 500px);
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
