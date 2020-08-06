<template>
  <div id="cesiumDiv">
    <div id="cesiumContainer" ref="cesiumContainer" />
    <transition name="fade">
      <RightPanel v-if="ropend" />
    </transition>
  </div>
</template>

<script>
// import Cesium from 'cesium/Cesium'
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";

// import IllegalBuilding from '../monomerization_cesium/components/IllegalBuilding/index'
import RightPanel from "../monomerization_cesium/components/RightPanel/index";

// import IllegalBuildingImg from '../../../assets/cesium_images/违章.png'
import trash from "../../../assets/cesium_images/trash.png";

import occupation from "../../../assets/json/occupation.json";
import communityJson from "@/assets/geojson/社区.json";

var viewer = null;

export default {
  name: "",
  components: {
    RightPanel,
  },
  data() {
    return {
      ropend: false,
    };
  },
  mounted() {
    viewer = this.init();
    var _this = this;
    occupation.map((o, i) => {
      if (o["type"] === "占道") {
        _this.addEntity(
          viewer,
          Cesium.Cartesian3.fromDegrees(
            parseFloat(o["long"]),
            parseFloat(o["lat"]),
            10
          ),
          "违法占道",
          trash
        );
      } else {
        _this.addEntity(
          viewer,
          Cesium.Cartesian3.fromDegrees(
            parseFloat(o["long"]),
            parseFloat(o["lat"]),
            10
          ),
          "环境卫生",
          trash
        );
      }
    });
    this.loadKml(viewer, "http://202.114.148.160/workspace/Street1.kml");
    this.initInfobox(viewer);
    // this.loadJsonLayer(
    //   viewer,
    //   communityJson,
    //   '社区',
    //   entity => {
    //     entity.name = entity.properties.name_1
    //     this.setEntityLabel(entity, 9000)
    //   }
    // )
  },
  methods: {
    init() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM";
      viewer = new Cesium.Viewer("cesiumContainer", {
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
        infoBox: false,
        // imageryProviderViewModels: baselayers,
        // selectedImageryProviderViewModel: baselayers[0]
        // imageryProvider: new Cesium.MapboxImageryProvider({
        //   // mapId: 'mapbox.dark',
        //   // mapId: 'mapbox.dark',
        //   mapId: 'mapbox.streets',
        //   accessToken: 'pk.eyJ1Ijoia2FubWluZyIsImEiOiJjanhwdGhoaTkwbGJhM3BsZjVrbjhxeHV3In0.dDPzpxKYG4iN5Bs0J8ttIQ',
        //   format: 'png'
        // })
        // imageryProvider: new Cesium.MapboxStyleImageryProvider({
        //   styleId: 'navigation-preview-day-v4',
        //   accessToken: 'pk.eyJ1Ijoia2FubWluZyIsImEiOiJjanhwdGhoaTkwbGJhM3BsZjVrbjhxeHV3In0.dDPzpxKYG4iN5Bs0J8ttIQ'
        // })
        // terrainProvider: Cesium.createWorldTerrain() //建议不要加载全球地形
      });

      return viewer;
    },
    loadKml(viewer, url) {
      var kmlOptions = {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToGround: true,
      };

      var kmlPromise = Cesium.KmlDataSource.load(url, kmlOptions);

      kmlPromise.then(function (dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource);

        // Get the array of entities
        var neighborhoodEntities = dataSource.entities.values;
        debugger;

        for (var i = 0; i < neighborhoodEntities[0]._children.length; i++) {
          var entity = neighborhoodEntities[0]._children[i]._children[0];
          // dataSource
          // Generate Polygon position
          var polyPositions = entity.polygon.hierarchy.getValue(
            Cesium.JulianDate.now()
          ).positions;
          var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions)
            .center;
          polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
            polyCenter
          );

          entity.position = polyCenter;
          // // Generate labels
          entity.label = {
            text: entity.name,
            showBackground: true,
            scale: 0.6,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
              10.0,
              8000.0
            ),
            disableDepthTestDistance: 100.0,
            position: new Cesium.Cartesian3(0.0, 1000000.0, 0.0),
          };
        }
        debugger;
        viewer.flyTo(dataSource);
      });
    },
    addEntity(viewer, postion, text, img) {
      viewer.entities.add({
        // id: text,
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
          scale: 0.5,
        },
        billboard: {
          image: img, // default: undefined
          text: "123",
          show: true, // default
          width: 50,
          height: 50,
          disableDepthTestDistance: 1000000000,
          scale: 0.6,
          // translucencyByDistance: new Cesium.NearFarScalar(
          //   1.5e2,
          //   0.5,
          //   1.5e5,
          //   0.0
          // )
        },
      });
    },
    loadJsonLayer(viewer, jsondata, name, callback) {
      Cesium.Math.setRandomNumberSeed(0);

      var GeoJsonDataSource = new Cesium.GeoJsonDataSource(name);

      var dataPromise = GeoJsonDataSource.load(jsondata);

      dataPromise.then((dataSource) => {
        viewer.dataSources.add(dataSource);
        var entities = dataSource.entities.values;

        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          if (Cesium.defined(entity.polygon)) {
            var color = Cesium.Color.fromRandom({
              alpha: 0.3,
            });
            entity.polygon.material = color;
            entity.polygon.outline = false;
            entity.polygon.outlineColor = Cesium.Color.WHITE;

            // entity.name = entity.properties.Name
            callback(entity);
            // debugger
            var polyPositions = entity.polygon.hierarchy.getValue(
              Cesium.JulianDate.now()
            ).positions;
            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions)
              .center;
            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(
              polyCenter
            );

            entity.position = polyCenter;
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
      });
      return dataPromise;
    },
    initInfobox(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      var _this = this;
      handler.setInputAction((movement) => {
        var pickedPrimitive = viewer.scene.pick(movement.position);
        if (pickedPrimitive.show === true) {
          _this.partyopend = !_this.partyopend;
          return;
        }
        var pickedEntity = Cesium.defined(pickedPrimitive)
          ? pickedPrimitive.id
          : undefined;
        if (Cesium.defined(pickedEntity)) {
          // debugger
          if (pickedEntity.label.text._value === "刘德兰") {
            _this.opened = !_this.opened;
            // debugger
            return;
          }
          if (pickedEntity.label.text._value === "消防栓") {
            _this.fopened = !_this.fopened;
            debugger;
            return;
          }
          if (pickedEntity.label.text._value === "违法占道") {
            _this.ropend = !_this.ropend;
            return;
          }
          if (pickedEntity.label.text._value === "火灾") {
            _this.fireOpened = !_this.fireOpened;
            return;
          }
          if (pickedEntity.label.text._value === "陈瑞华") {
            debugger;
            _this.popend = !_this.popend;
            return;
          }
          if (pickedEntity.label.text._value === "违章建筑") {
            debugger;
            _this.iopend = !_this.iopend;
            return;
          }
          debugger;
          if (pickedEntity.label.text._value === "矫正人员") {
            _this.keyType = 1;
            _this.kopened = true;
            return;
          }
          if (pickedEntity.label.text._value === "刑满释放人员") {
            _this.keyType = 2;
            return;
          }
          if (pickedEntity.label.text._value === "涉政人员") {
            _this.keyType = 3;
            return;
          }
          // _this.opened = !_this.opened
          // windowParams.opened = !windowParams.opened
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
  },
};
</script>

<style scoped>
#cesiumContainer {
  height: calc(100vh - 84px);
}
</style>
