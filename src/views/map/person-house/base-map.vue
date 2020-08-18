<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer" />
  </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
var interOper = require("./interactivate3DTiles");
import "cesium/Widgets/widgets.css";
import { interactOperate } from "./interactivate3DTiles.js";

export default {
  name: "person-house-map",
  data() {
    return {
      viewer: {},
      origin3DTilesUrl:
        "http://localhost/xjp/3D/fftx/1building3DTiles/tileset.json",//origin3DTiles
      dtf3DTilesUrl: "http://localhost/xjp/3D/fftx/dth3DTiles/tileset.json",//"http://202.114.148.160/saxc-dth/tileset.json"
    };
  },
  mounted() {
    this.initMap();
    this.loadData();
  },
  methods: {
    initMap() {
      this.viewer = new Cesium.Viewer("cesiumContainer", {
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
        requestRenderMode: true,
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //   url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=b97312f85a240009c717a8480b6d54d2',
        //   layer: 'tdtBasicLayer',
        //   style: 'default',
        //   format: 'image/jpeg',
        //   tileMatrixSetID: 'GoogleMapsCompatible',
        //   show: false
        // }) // 天地图影像
        // terrainProvider: Cesium.createWorldTerrain() //建议不要加载全球地形
      });
    },
    loadData() {
      this.load3DTiles(
        this.viewer,
        this.origin3DTilesUrl,
        true,
        null,
        null,
        "原始倾斜测量模型加载完成"
      );

      this.load3DTiles(
        this.viewer,
        this.dtf3DTilesUrl,
        true,
        Cesium.ClassificationType.CESIUM_3D_TILE,
        new Cesium.Cesium3DTileStyle({
          color: "rgba(255,255,255,0.9)",
        }),
        "单体化模型加载完成"
      );
    },

    load3DTiles(
      viewer,
      url,
      isFlyto,
      classificationType,
      style,
      message = "load 3DTiles successful"
    ) {
      var tiltTileset = null;

      if (classificationType) {
        debugger;
        tiltTileset = new Cesium.Cesium3DTileset({
          url: url,
          // classificationType: classificationType,
        });
      } else {
        tiltTileset = new Cesium.Cesium3DTileset({
          url: url,
          // classificationType: classificationType,
        });
      }

      // tiltTileset.classificationType = classificationType;
      tiltTileset.style = style;

      let self = this

      tiltTileset.readyPromise.then((tileset) => {
        viewer.scene.primitives.add(tileset);
        if (isFlyto) viewer.flyTo(tileset);

        // debugger
        if (style) interOper.interactOperate.install(self.viewer);

        console.log(message);
      });
    },
  },
};
</script>

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