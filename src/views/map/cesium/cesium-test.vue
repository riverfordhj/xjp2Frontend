<template>
<div>
  <div id="cesiumContainer" ref="cesiumContainer" />

</div>
</template>

<script>
// import Cesium from 'cesium/Source/Cesium'
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
// import CesiumNavigation from 'cesium-navigation-es6'
export default {
  mounted() {
    const viewerOption = {
      geocoder: false, // 地理位置查询定位控件
      homeButton: false, // 默认相机位置控件
      timeline: false, // 时间滚动条控件
      navigationHelpButton: false, // 默认的相机控制提示控件
      fullscreenButton: false, // 全屏控件
      scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
      baseLayerPicker: false, // 底图切换控件
      animation: false, // 控制场景动画的播放速度控件
    };
    console.log("Cesium", Cesium);
    const viewer = new Cesium.Viewer(this.$el, viewerOption);
    viewer._cesiumWidget._creditContainer.style.display = "none"; // 隐藏版权
  },
};
</script>

<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
