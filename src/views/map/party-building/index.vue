<template>
  <div id="cesiumDiv">
    <div
      id="cesiumContainer"
      ref="cesiumContainer"
    />
  </div>
</template>

<script>
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

export default {
  name: '',
  data() {
    return {

    }
  },
  mounted() {
    var viewer = this.init()
    this.loadKml(viewer, 'http://202.114.148.160/workspace/partyBuilding.kml')
  },
  methods: {
    init() {
      Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM'
      var viewer = new Cesium.Viewer('cesiumContainer', {
        geocoder: false, // 搜索
        homeButton: false, // 主页 地球回正
        sceneModePicker: false, // 地球平铺 网格  3d/2d选择器
        baseLayerPicker: true,
        animation: false, // 是否创建动画小器件，左下角仪表
        selectionIndicator: false,
        fullscreenButton: false,
        // infoBox: true,
        navigationHelpButton: false, // 是否显示右上角的帮助按钮
        timeline: false,
        // baseLayerPicker: true //图层选择器
        infoBox: false
        // imageryProviderViewModels: baselayers,
        // selectedImageryProviderViewModel: baselayers[0]
      })

      return viewer
    },
    loadKml(viewer, url) {
      var kmlOptions = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true
      }

      var kmlPromise = Cesium.KmlDataSource.load(url, kmlOptions)

      kmlPromise.then(function(dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource)

        // Get the array of entities
        var neighborhoodEntities = dataSource.entities.values
        debugger

        for (var i = 0; i < neighborhoodEntities[0]._children.length; i++) {
          var entity = neighborhoodEntities[0]._children[i]._children[0]
          // dataSource
          // Generate Polygon position
          var polyPositions = entity.polygon.hierarchy.getValue(
            Cesium.JulianDate.now()
          ).positions
          var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center
          polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter)

          entity.position = polyCenter
          // // Generate labels
          entity.label = {
            text: entity.name,
            showBackground: true,
            scale: 0.6,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 8000.0),
            disableDepthTestDistance: 100.0,
            position: new Cesium.Cartesian3(0.0, 1000000.0, 0.0)
          }
        }
        debugger
        viewer.flyTo(dataSource)
      })
    }
  }
}
</script>

<style scoped>
#cesiumContainer {
  height: calc(100vh - 84px);
}
</style>
