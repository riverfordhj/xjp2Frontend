<template>
  <div
    id="cesiumContainer"
    ref="cesiumContainer"
  />
</template>

<script>
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'

export default {
  name: '',
  data() {
    return {
      tiltTileset: null,
      infoWindowPosition: null,
      dock: null,
      table: null,
      preSelectedFeature: null,
      oldpreSelectedFeatureColor: null,
      options: {
        enableCompass: true,
        enableZoomControls: true,
        enableCompassOuterRing: true
      },
      saxc3dTilesUrl: 'http://202.114.148.160:88/saxc/tileset.json',
      // saxc3dTilesUrl: 'http://202.114.148.160/sogbTo3dtiles/DongJiaCun/tileset.json',
      classifies: [
        'http://106.14.203.229:8088/cesiumlab/SAXC单体化结果数据/矢量面3dtiles/saxc_c/tileset.json', // 水岸星城商业楼
        'http://106.14.203.229:8088/cesiumlab/SAXC单体化结果数据/矢量面3dtiles/saxc_DHT/tileset.json', // 水岸星城别墅楼
        'http://106.14.203.229:8088/cesiumlab/SAXC单体化结果数据/矢量面3dtiles/saxc_G/tileset.json' // 水岸星城高层楼
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var viewer = new Cesium.Viewer('cesiumContainer', {
        baseLayerPicker: false,
        fullscreenButton: false,
        sceneModePicker: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        animation: false,
        infoBox: true,
        requestRenderMode: true,
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url: 'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=b97312f85a240009c717a8480b6d54d2',
          layer: 'tdtBasicLayer',
          style: 'default',
          format: 'image/jpeg',
          tileMatrixSetID: 'GoogleMapsCompatible',
          show: false
        }) // 天地图影像
        // terrainProvider: Cesium.createWorldTerrain() //建议不要加载全球地形
      })
      viewer.extend(Cesium.viewerCesiumInspectorMixin)
      this.initCamera(viewer)

      // var cartesian3 = new Cesium.Cartesian3(530983, 3383756, 0)
      // var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian3)
      // var lat = Cesium.Math.toDegrees(cartographic.latitude)
      // var lng = Cesium.Math.toDegrees(cartographic.longitude)
      // var alt = cartographic.height
      // console.log(lat, lng, alt)
    },
    initCamera(viewer) {
      console.log('我要飞起来')
      viewer.camera.setView({
        // 目前为美国远视角
        destination: new Cesium.Cartesian3(
          -15667812.132413927,
          41105343.40350053,
          29594107.624624893
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0), // 方向
          pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
          roll: 0
        }
      })
      var _this = this
      window.setTimeout(function() {
        _this.add3DtilesDyt(viewer)
      }, 2000)
    },
    add3DtilesDyt(viewer) {
      // 添加倾斜模型
      // var _this = this
      this.tiltTileset = new Cesium.Cesium3DTileset({
        url: this.saxc3dTilesUrl
      })

      this.tiltTileset.readyPromise.then(function(tileset) {
        console.log(tileset)
        // _this.addMouseEvent(viewer)
        // 添加导航
        // CesiumNavigation(viewer, options);
        // 初始化弹框
        // initInfowindow(viewer)
        viewer.scene.primitives.add(tileset)
        viewer.flyTo(tileset)
        // _this.$store.dispatch('AddCesiumData', tiltTileset)
      })
      // 添加矢量面分类图层
      // _this.classifies.forEach(function(v) {
      //   console.log('v: ', v)
      //   var classificationTileset = new Cesium.Cesium3DTileset({
      //     url: v,
      //     classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
      //   })
      //   classificationTileset.style = new Cesium.Cesium3DTileStyle({
      //     color: 'rgba(255,255,255,0.01)'
      //   })
      //   viewer.scene.primitives.add(classificationTileset)
      // })
    },
    addMouseEvent(viewer) {
      this.addPointMoveEvent(viewer)
      this.addLeftClickEvent(viewer)
    },
    addPointMoveEvent(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      handler.setInputAction(function(evt) {
        var pick = viewer.scene.pick(evt.endPosition)
        if (pick) {
          // $('#cesiumContainer').css('cursor', 'pointer')
        } else {
          // $('#cesiumContainer').css('cursor', 'default')
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    },
    addLeftClickEvent(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      var _this = this
      handler.setInputAction(function(evt) {
        var pick = viewer.scene.pick(evt.position)
        console.log('evt,pick', evt, pick)
        if (pick) {
          if (pick instanceof Cesium.Cesium3DTileFeature) {
            _this.hightLightAndGetProps(pick)
            // // 弹出框 start
            // var position = viewer.scene.pickPosition(evt.position)
            // if (!position) {
            //   position = Cesium.Cartesian3.fromDegrees(0, 0, 0)
            // }
            // infoWindowPosition = position
            // /* 气泡相关 4/4 start */
            // $('#bubble').show()
            // for (var i = table.rows.length - 1; i > -1; i--) {
            //   table.deleteRow(i)
            // }
            var propertyNames = pick.getPropertyNames()
            // var length = propertyNames.length
            // for (var i = 0; i < length; ++i) {
            //   var propertyName = propertyNames[i]
            //   var newRow = table.insertRow()
            //   var
            //     cell1 = newRow.insertCell()
            //   var cell2 = newRow.insertCell()
            //   cell1.innerHTML = propertyName
            //   cell2.innerHTML = pick.getProperty(propertyName)
            console.log(propertyNames)
          }
        } else {
          // infoWindowPosition = null
          // $('#bubble').hide()
        }
        // }
        //   setTimeout(() => {
        //   console.log('选择的尸体', viewer.selectedEntity)
        // }, 2000)
        //   // this.identity(viewer, evt.position.x, evt.position.y);
        //   console.log('相机视角', viewer.scene.camera)
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    hightLightAndGetProps(tileFeature) {
      if (this.preSelectedFeature instanceof Cesium.Cesium3DTileFeature) {
        this.preSelectedFeature.color = this.oldpreSelectedFeatureColor
      }
      this.preSelectedFeature = tileFeature
      this.oldpreSelectedFeatureColor = tileFeature.color
      // 设置颜色
      tileFeature.color = Cesium.Color.fromAlpha(Cesium.Color.LAWNGREEN, 0.3)
      this.getPropsOf3DTileFeature(tileFeature)
    },
    getPropsOf3DTileFeature(tileFeature) {
      var propertyNames = tileFeature.getPropertyNames()
      var length = propertyNames.length
      for (var i = 0; i < length; ++i) {
        var propertyName = propertyNames[i]
        console.log(propertyName + ': ' +
          tileFeature.getProperty(propertyName))
      }
    }
  }
}
</script>

<style scoped>
#cesiumContainer {
  height: calc(100vh - 84px);
}
</style>
