/*
 * @Descripttion: test
 * @version:1
 * @Author: KanMing
 * @Date: 2019-06-10 10:42:37
 * @LastEditors: KanMing
 * @LastEditTime: 2019-09-27 09:33:37
 */
/* jshint esversion: 6 */

// import Cesium from 'cesium/Cesium'
var Cesium = require('cesium/Cesium')

// 初始化
export function initCesium (viewer, cesiumObjs, CesiumNavigation) {
  viewer = initViewer(Cesium)

  initNavigation(CesiumNavigation, viewer)
  getPositionByMouse(viewer, cesiumObjs)
  return viewer
}

// 初始化viewer
function initViewer () {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM'

  const baselayers = initBaseLayer(viewer)

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
    infoBox: true,
    requestRenderMode: true,
    scene3DOnly: true,
    imageryProviderViewModels: baselayers,
    selectedImageryProviderViewModel: baselayers[0]
  })
  // viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin)
  console.log('Cesium', Cesium, 'viewer', viewer)
  return viewer
}

// 设置默认底图
function initBaseLayer (viewer) {
  var img_arcgis_yxdt = new Cesium.ProviderViewModel({
    name: 'ESRI影像',
    tooltip: 'ESRI影像',
    iconUrl:
      'https://cesiumjs.org/releases/1.56.1/Build/Cesium/Widgets/Images/ImageryProviders/esriWorldImagery.png',
    creationFunction: function () {
      var esri = new Cesium.ArcGisMapServerImageryProvider({
        url:
          'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
      })
      return esri
    }
  })
  var img_arcgis_jcdt = new Cesium.ProviderViewModel({
    name: 'ESRI矢量',
    tooltip: 'ESRI矢量',
    iconUrl:
      'https://cesiumjs.org/releases/1.56.1/Build/Cesium/Widgets/Images/ImageryProviders/esriWorldStreetMap.png',
    creationFunction: function () {
      var esri = new Cesium.ArcGisMapServerImageryProvider({
        url:
          'http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
      })
      return esri
    }
  })
  var img_tdt_yx = new Cesium.ProviderViewModel({
    name: '天地图影像',
    tooltip: '天地图影像',
    iconUrl: require('../../../assets/cesium_images/img.jpg'),
    creationFunction: function () {
      var tian1 = new Cesium.WebMapTileServiceImageryProvider({
        url:
          'http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=d4747908a3f86c33dcfa0d02d74106a6',
        layer: 'tdtBasicLayer',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible',
        show: false
      })

      var zj = new Cesium.WebMapTileServiceImageryProvider({
        url:
          'http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=d4747908a3f86c33dcfa0d02d74106a6',
        layer: 'tiandituImgMarker',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'tiandituImgMarker',
        show: true,
        maximumLevel: 18
      })
      return [tian1, zj]
    }
  })

  var img_tdt_sl = new Cesium.ProviderViewModel({
    name: '天地图矢量',
    tooltip: '天地图矢量',
    iconUrl: require('../../../assets/cesium_images/vec.jpg'),
    creationFunction: function () {
      var tian2 = new Cesium.WebMapTileServiceImageryProvider({
        url:
          'http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=d4747908a3f86c33dcfa0d02d74106a6',
        layer: 'tdtVecBasicLayer',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible',
        show: false
      })

      var zj = new Cesium.WebMapTileServiceImageryProvider({
        url:
          'http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=d4747908a3f86c33dcfa0d02d74106a6',
        layer: 'tdtAnnoLayer',
        style: 'default',
        format: 'image/jpeg',
        tileMatrixSetID: 'GoogleMapsCompatible',
        show: true,
        maximumLevel: 18
      })
      return [tian2, zj]
    }
  })

  return [img_arcgis_yxdt, img_arcgis_jcdt, img_tdt_sl, img_tdt_yx]
}

// 导航控件
function initNavigation (CesiumNavigation, viewer) {
  var options = {}
  // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
  // options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
  options.defaultResetView = Cesium.Rectangle.fromDegrees(
    114.25,
    30.58,
    114.4,
    30.59
  )
  // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
  options.enableCompass = true
  // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
  options.enableZoomControls = true
  // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
  options.enableDistanceLegend = true
  // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
  options.enableCompassOuterRing = true

  CesiumNavigation(viewer, options)
}

// 加载json
export function loadJsonLayer (viewer, jsondata, name, callback) {
  Cesium.Math.setRandomNumberSeed(0)

  var GeoJsonDataSource = new Cesium.GeoJsonDataSource(name)

  var dataPromise = GeoJsonDataSource.load(jsondata)

  dataPromise.then(dataSource => {
    viewer.dataSources.add(dataSource)
    var entities = dataSource.entities.values

    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i]
      if (Cesium.defined(entity.polygon)) {
        var color = Cesium.Color.fromRandom({
          alpha: 0.3
        })
        entity.polygon.material = color
        entity.polygon.outline = false
        entity.polygon.outlineColor = Cesium.Color.WHITE

        // entity.name = entity.properties.Name
        callback(entity)
        // debugger
        var polyPositions = entity.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions
        var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center
        polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter)

        entity.position = polyCenter
        // Generate labels
        // entity.label = {
        //   text: entity.name,
        //   showBackground: true,
        //   scale: 0.6,
        //   horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //   distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 5000.0),
        //   disableDepthTestDistance: 100.0
        //   // translucencyByDistance: new Cesium.NearFarScalar(1.5e5, 1.0, 1.5e7, 0.0)
        //   // text: entity.name,
        //   // // showBackground: true,
        //   // scale: 0.7,
        //   // // horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        //   // // verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        //   // // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        //   // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
        //   //   100.0,
        //   //   2000000.0
        //   // ),
        //   // translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0),
        //   // disableDepthTestDistance: 500
        //   // // show: false
        // }
      }
      if (Cesium.defined(entity.polyline)) {
        // entity.polyline.material = color
      }
      if (Cesium.defined(entity.point)) {
        // entity.point.material = color
      }
    }
  })
  return dataPromise
}

// 鼠标位置追踪
function getPositionByMouse (viewer, cesiumObjs) {
  // 得到当前三维场景
  // var scene = self.viewer.scene;
  // 得到当前三维场景的椭球体
  // var ellipsoid = scene.globe.ellipsoid;

  // cartesian = self.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);

  var longitudeString = null
  var latitudeString = null
  var height = null
  var cartesian = null

  // debugger

  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  // var ray;
  handler.setInputAction(event => {
    // ray = self.viewer.scene.camera.getPickRay(event.endPosition);
    // cartesian = self.viewer.scene.globe.pick(ray, self.viewer.scene)
    cartesian = viewer.scene.pickPosition(event.endPosition)
    if (cartesian) {
      // 将笛卡尔坐标转换为地理坐标
      // var cartographic = ellipsoid.cartesianToCartographic(cartesian)
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian)
      // 将弧度转为度的十进制度表示
      longitudeString = Cesium.Math.toDegrees(cartographic.longitude)
      latitudeString = Cesium.Math.toDegrees(cartographic.latitude)

      // 获取相机高度
      height = Math.ceil(viewer.scene.camera.positionCartographic.height)
      // debugger;
      cesiumObjs.latitude = longitudeString.toFixed(2)
      cesiumObjs.longitude = latitudeString.toFixed(2)
      // cesiumObjs.mHeight = cartographic.height.toFixed(0);
      cesiumObjs.mHeight = 0
      cesiumObjs.wHeight = height.toFixed(0)
    } else {
      // entity.label.show = false;
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

  // 设置鼠标滚动事件的处理函数，这里负责监听高度值变化
  handler.setInputAction(wheelment => {
    height = Math.ceil(viewer.camera.positionCartographic.height)
    cesiumObjs.wHeight = height.toFixed(0)
  }, Cesium.ScreenSpaceEventType.WHEEL)
}

// tooltip
export function initTooltip (viewer, tooltipParams) {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction(event => {
    var pickedPrimitive = viewer.scene.pick(event.endPosition)
    var pickedEntity = Cesium.defined(pickedPrimitive)
      ? pickedPrimitive.id
      : undefined
    if (Cesium.defined(pickedEntity)) {
      if (pickedEntity.properties.propertyNames.indexOf('name_1') > -1) {
        tooltipParams.title = pickedEntity.properties.name_1._value
        tooltipParams.layerType = '社区'
      } else if (pickedEntity.properties.propertyNames.indexOf('楼栋号') > -1) {
        tooltipParams.title = pickedEntity.properties['楼栋号']._value
        tooltipParams.layerType = '楼栋'
      } else if (
        pickedEntity.properties.propertyNames.indexOf('grid_name') > -1
      ) {
        tooltipParams.title = pickedEntity.properties.grid_name._value
        tooltipParams.layerType = '网格'
      } else {
        tooltipParams.title = pickedEntity.properties.name._value
        tooltipParams.layerType = '楼栋'
      }
      tooltipParams.opened = true
      tooltipParams.left = event.endPosition.x
      tooltipParams.top = event.endPosition.y
    } else {
      tooltipParams.opened = false
      tooltipParams.left = 0
      tooltipParams.top = 0
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
}

// 缩放到jsonLayer
export function FlyToJsonLayer (jsonData, viewer) {
  viewer.flyTo(jsonData)
}

// 点击弹窗
export function initInfoBox (viewer, windowParams) {
  var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  // var previousPickedEntity = undefined;
  handler.setInputAction(movement => {
    var pickedPrimitive = viewer.scene.pick(movement.position)
    var pickedEntity = Cesium.defined(pickedPrimitive)
      ? pickedPrimitive.id
      : undefined
    if (Cesium.defined(pickedEntity)) {
      if (pickedEntity.properties.propertyNames.indexOf('name_1') > -1) {
        windowParams.title = pickedEntity.properties.name_1._value
        windowParams.layerType = '社区'
      } else if (pickedEntity.properties.propertyNames.indexOf('楼栋号') > -1) {
        windowParams.title = pickedEntity.properties['楼栋号']._value
        windowParams.layerType = '楼栋'
      } else if (
        pickedEntity.properties.propertyNames.indexOf('grid_name') > -1
      ) {
        windowParams.title = pickedEntity.properties.grid_name._value
        windowParams.layerType = '网格'
      } else {
        windowParams.title = pickedEntity.properties.name._value
        windowParams.layerType = '楼栋'
      }

      // const propertyNames = pickedEntity.properties.propertyNames
      // switch (pickedEntity.properties.propertyNames) {
      //   case propertyNames.indexOf('name_1') > -1:
      //     windowParams.title = pickedEntity.properties.name_1._value
      //     break
      //   case propertyNames.indexOf('grid_name') > -1:
      //     windowParams.title = pickedEntity.properties.grid_name._value
      //     break
      //   default:
      //     windowParams.title = pickedEntity.properties['楼栋号']._value
      // }

      windowParams.opened = !windowParams.opened
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}
