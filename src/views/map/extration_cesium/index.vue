<template>
  <div>
    <div
      id="cesiumContainer"
      ref="cesiumContainer"
    />
    <!-- <OldMen-Dialog :opened="opened" /> -->
  </div>

</template>

<script>
import Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import SAXC from '../../../assets/geojson/json_水岸星城/建筑_水岸星城.json'
import oldMan from '../../../assets/cesium_images/80s.png'
import oldMan1 from '../../../assets/cesium_images/oldMen1.png'
import fire from '../../../assets/cesium_images/fire.png'

import oldMenJson from '../../../assets/json/newOldMen.json'

// import OldMenDialog from '../../../components/OldMenDialog'

var viewer

export default {
  name: '',
  components: {
    // OldMenDialog
  },
  data() {
    return {
      opened: true
    }
  },
  mounted() {
    viewer = this.init()
    var layer = this.loadJsonLayer(viewer, SAXC)
    this.flyToJsonLayer(layer, viewer)
    viewer.flyTo(layer)
    // this.addFire(viewer)
    var _this = this
    oldMenJson.map(men => {
      // debugger
      _this.addEntity(
        Cesium.Cartesian3.fromDegrees(parseFloat(men['经度']), parseFloat(men['纬度']), parseFloat(men['楼层']) * 3),
        men['姓名'],
        oldMan
      )
    })
    _this.addEntity(
      Cesium.Cartesian3.fromDegrees(114.33850575, 30.577023283, 3),
      '刘德兰',
      oldMan1
    )
    console.log(viewer.scene.primitives)
  },
  methods: {
    init(viewer) {
      console.log(Cesium)
      // var map = new Cesium.MapboxStyleImageryProvider({
      //   styleId: 'streets-v11',
      //   accessToken: 'pk.eyJ1Ijoia2FubWluZyIsImEiOiJjanhwdGhoaTkwbGJhM3BsZjVrbjhxeHV3In0.dDPzpxKYG4iN5Bs0J8ttIQ'
      // })
      return new Cesium.Viewer('cesiumContainer', {
        shouldAnimate: true,
        baseLayerPicker: false,
        fullscreenButton: false,
        sceneModePicker: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        animation: false,
        infoBox: false,
        requestRenderMode: true,
        imageryProvider: new Cesium.MapboxImageryProvider({
          // mapId: 'mapbox.dark',
          // mapId: 'mapbox.dark',
          mapId: 'mapbox.light',
          accessToken: 'pk.eyJ1Ijoia2FubWluZyIsImEiOiJjanhwdGhoaTkwbGJhM3BsZjVrbjhxeHV3In0.dDPzpxKYG4iN5Bs0J8ttIQ',
          format: 'png'
        })
        // imageryProvider: new Cesium.MapboxStyleImageryProvider({
        //   styleId: 'streets-v11',
        //   accessToken: 'pk.eyJ1Ijoia2FubWluZyIsImEiOiJjanhwdGhoaTkwbGJhM3BsZjVrbjhxeHV3In0.dDPzpxKYG4iN5Bs0J8ttIQ'
        // })
        // terrainProvider: Cesium.createWorldTerrain() //建议不要加载全球地形
      })
    },
    loadJsonLayer(viewer, jsondata) {
      // debugger
      var geojsonOptions = {
        clampToGround: true,
        fill: Cesium.Color.RED
      }

      var dataPromise = Cesium.GeoJsonDataSource.load(
        jsondata,
        geojsonOptions
      )

      dataPromise.then((dataSource) => {
        viewer.dataSources.add(dataSource)
        var neighborhoodEntities = dataSource.entities.values

        var color = Cesium.Color.fromRandom({
          alpha: 0.9
        })
        for (var i = 0; i < neighborhoodEntities.length; i++) {
          var entity = neighborhoodEntities[i]

          if (Cesium.defined(entity.polygon)) {
            // entity.polygon.material = Cesium.Color.fromRandom({
            //   alpha: 0.1
            // });
            // entity.polygon.material = new Cesium.Color(
            //   0.254,
            //   0.411,
            //   0.882,
            //   0.8
            // )
            entity.polygon.material = new Cesium.Color(
              30 / 255,
              144 / 255,
              255 / 255,
              1
            )
            entity.polygon.extrudedHeight = entity.properties['louceng'] * 3
            entity.polygon.outline = false
            entity.polygon.outlineColor = new Cesium.Color(
              30 / 255,
              144 / 255,
              255 / 255,
              0.9
            )
            // entity.name = entity.properties['louceng']
            // debugger
            // entity.label = {
            //   text: entity.name,
            //   showBackground: true,
            //   scale: 0.6,
            //   horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            //   verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            //   // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            //   //   10.0,
            //   //   9000
            //   // ),
            //   disableDepthTestDistance: 100.0
            // }
            var polyPositions = entity.polygon.hierarchy.getValue(
              Cesium.JulianDate.now()
            ).positions
            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions)
              .center
            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
              polyCenter
            )

            entity.position = polyCenter
          }
          if (Cesium.defined(entity.polyline)) {
            entity.polyline.material = color
          }
          if (Cesium.defined(entity.point)) {
            entity.point.material = color
          }
          dataSource.show = true
          // callback(dataSource)
          // debugger
          // console.log(viewer)
        }
      })
      return dataPromise
    },
    flyToJsonLayer(jsonData, viewer) {
      viewer.flyTo(jsonData)
    },
    addFire(viewer) {
      viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
          // image: require('../../../../public/fire.png'),
          image: fire,
          imageSize: new Cesium.Cartesian2(20, 20),
          startScale: 1.0,
          endScale: 4.0,
          // Particle behavior
          particleLife: 1.0,
          speed: 1,
          emissionRate: 50,
          lifetime: 0.1,
          modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(114.339, 30.57883, 3)
          ),
          mass: 10,
          emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0))
        })
      )
    },
    addEntity(postion, text, img) {
      viewer.entities.add({
        position: postion,
        label: {
          text: text,
          // font: parseInt(objEntity.FontSize) * 2.2 + 'px ' + objEntity.FontName,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          outlineWidth: 6,
          translucencyByDistance: new Cesium.NearFarScalar(
            1.5e2,
            1.0,
            1.5e5,
            0.0
          ),
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          // verticalOrigin : LSGlobe.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
          pixelOffset: new Cesium.Cartesian2(15, -2), // 偏移量
          disableDepthTestDistance: 1000000000, // 优先级
          scale: 0.5
        },
        billboard: {
          image: img, // default: undefined
          text: '123',
          show: true, // default
          width: 50,
          height: 50,
          disableDepthTestDistance: 1000000000,
          scale: 0.5
          // translucencyByDistance: new Cesium.NearFarScalar(
          //   1.5e2,
          //   0.5,
          //   1.5e5,
          //   0.0
          // )
        }
      })
    },
    initInfoBox(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      handler.setInputAction(movement => {
        var pickedPrimitive = viewer.scene.pick(movement.position)
        var pickedEntity = Cesium.defined(pickedPrimitive)
          ? pickedPrimitive.id
          : undefined
        if (Cesium.defined(pickedEntity)) {

          // windowParams.opened = !windowParams.opened
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }
  }
}
</script>

<style scoped>
#cesiumContainer {
  height: calc(100vh - 84px);
}
</style>
