<template>
  <div id="cesiumDiv">
    <div id="cesiumContainer" ref="cesiumContainer" />
    <Cesium-tooltip
      :title="tooltipParams.title"
      :opened="tooltipParams.opened"
      :layer-type="tooltipParams.layerType"
      :left="tooltipParams.left"
      :top="tooltipParams.top"
    />

    <!-- <LayerTree /> -->
    <div id="menu">
      <el-card class="box-card">
        <!-- <el-tree
          :data="tree_data"
          show-checkbox
          node-key="id"
          :expand-on-click-node="false"
          :default-checked-keys="defaultChecked"
          @check-change="handleCheckChange"
          @node-click="handleNodeClick"
        >
          <span
            slot-scope="{ node }"
            class="custom-tree-node"
          >
            <span>
              <svg-icon
                style="margin-right:8px"
                icon-class="layer"
              />
              <span>{{ node.label }}</span>
            </span>
          </span>
        </el-tree>-->
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
    </div>
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
// import Cesium from "cesium/Cesium.js";
// import Cesium from "cesium/../Build/Cesium/Cesium.js";
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

import communityJson from "@/assets/geojson/社区.json";
import saxc_Building_Json from "@/assets/geojson/json_水岸星城/建筑_水岸星城2.json";
import saxc_grid_Json from "@/assets/geojson/json_水岸星城/网格_水岸星城.json";
import hubu_Building_Json from "@/assets/geojson/json_湖北大学/建筑_湖北大学.json";
import hubu_grid_Json from "@/assets/geojson/json_湖北大学/网格_湖北大学.json";

// var Cesium = this.Cesium;

export default {
  name: "",
  components: {
    // CesiumWindow,
    CesiumDialog,
    CesiumTooltip,
    // LayerTree
  },
  data() {
    return {
      cesiumObjs: {
        viewer: undefined,
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
      defaultChecked: [1, 2, 3, 4, 5],
      jsonLayers: new Map(),
      dialogVisible: false,
      transparency: 0,
      labelValue: true,
      max: 1,
      SelectedDataSource: [],
    };
  },
  mounted() {
    console.log("Cesium", this.Cesium);
    this.init();
    this.loadJson();
  },
  methods: {
    init() {
      initCesium(this.cesiumObjs, CesiumNavigation);
      initInfoBox(this.cesiumObjs.viewer, this.windowParams);
      initTooltip(this.cesiumObjs.viewer, this.tooltipParams);
    },
    loadJson() {
      var communityLayer = loadJsonLayer(
        this.cesiumObjs.viewer,
        communityJson,
        "社区",
        (entity) => {
          entity.name = entity.properties.name_1;
          this.setEntityLabel(entity, 9000);
        }
      );
      var SaxcGridLayer = loadJsonLayer(
        this.cesiumObjs.viewer,
        saxc_grid_Json,
        "网格_水岸星城",
        (entity) => {
          entity.name = entity.properties.grid_name;
          this.setEntityLabel(entity, 5000);
        }
      );
      var HubuGridLayer = loadJsonLayer(
        this.cesiumObjs.viewer,
        hubu_grid_Json,
        "网格_湖北大学",
        (entity) => {
          entity.name = entity.properties.grid_name;
          this.setEntityLabel(entity, 5000);
        }
      );
      var SaxcBuilingLayer = loadJsonLayer(
        this.cesiumObjs.viewer,
        saxc_Building_Json,
        "建筑_水岸星城",
        (entity) => {
          entity.name = entity.properties["楼栋号"];
          this.setEntityLabel(entity, 1500);
        }
      );
      var HubuBuilingLayer = loadJsonLayer(
        this.cesiumObjs.viewer,
        hubu_Building_Json,
        "建筑_湖北大学",
        (entity) => {
          entity.name = entity.properties.name;
          this.setEntityLabel(entity, 1500);
        }
      );

      FlyToJsonLayer(communityLayer, this.cesiumObjs.viewer);
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
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
          10.0,
          distance
        ),
        disableDepthTestDistance: 100.0,
      };
    },
    handleCheckChange(data, checked, indeterminate) {
      var target = this.jsonLayers.get(data.label);
      // if (data.label.match('模型')) {
      //   target.show = checked
      // } else {
      target.then(function (dataSource) {
        dataSource.entities.show = checked;
      });
      // }
    },
    handleNodeClick(data) {
      var target = this.jsonLayers.get(data.label);
      if (!target) {
        return;
      }
      // if (data.label.match('模型')) {
      //   FlyTo_TileSet(target, this.cesiumObjs.viewer)
      // } else {
      FlyToJsonLayer(target, this.cesiumObjs.viewer);
      // }
    },
    openTPanel(node, data, event) {
      event.stopPropagation();
      // console.log(node, data)
      var self = this;
      var target = this.jsonLayers.get(data.label);
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
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>
            <svg-icon style="margin-right:8px" icon-class="layer" />
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
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
    sliderChange() {
      Cesium.Math.setRandomNumberSeed(0);
      this.SelectedDataSource.entities.values.map((v) => {
        v.polygon.material = Cesium.Color.fromRandom({
          alpha: this.transparency,
        });
        // debugger
      });
    },
  },
};
</script>

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

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
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
</style>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.cesium-widget-credits {
  display: none !important;
  visibility: hidden !important;
}
</style>
