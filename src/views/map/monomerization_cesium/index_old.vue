<template>
  <div>
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
          选房
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showLayer">选房</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <OldMen-Dialog :opened="opened" :locationinfo="filterLoctionInfo" />
    <Fire-Dialog :fire-opened="fireOpened" />
    <people-Dialog :popend="popend" />
    <IllegalBuilding :iopend="iopend" />
    <PartyDialog :partyopend="partyopend" />
    <!-- <AdvancedSearch
      class="AdvancedSearch"
      @asComfirm="asComfirm"
    />-->
    <!-- <FireHrydrantDialog :fopened="fopened" /> -->
    <!-- <transition name="fade">
      <RightPanel v-if="ropend" />
    </transition>-->
    <!-- <transition name="fade">
      <KeyPeople
        v-if="kopened"
        :ktype="keyType"
      />
      KeyPeople
    </transition>-->

    <!-- <el-select
      v-model="value"
      class="select"
      placeholder="请选择或输入查询信息"
      filterable
      @change="selectionChange"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>-->
    <!-- <el-button
      style="position:absolute;left:10px;top:10px"
      @click="consoleTiles"
    >test</el-button>-->
  </div>
</template>

<script>
// import Cesium from 'cesium/Cesium'
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import OldMenDialog from "../../../components/OldMenDialog";
import FireDialog from "./components/FireDialog/index1";
import peopleDialog from "./components/peopleDialog/index";
import IllegalBuilding from "./components/IllegalBuilding/index";
import PartyDialog from "./components/PartyDialog/index";
import RightPanel from "./components/RightPanel/index";
import KeyPeople from "./components/KeyPeople/index";
import FireHrydrantDialog from "./components/FireHrydrantDialog/index";
import AdvancedSearch from "./components/AdvancedSearch/index";

import { featureViewer } from "./cesium";
import axios from 'axios';
import { getSpecialPersonLoction_ZH } from '@/api/person.js';


import oldMan1 from "../../../assets/cesium_images/oldMen1.png";
import fire from "../../../assets/cesium_images/fire.png";
import people from "../../../assets/cesium_images/people.png";
import keyPeople from "../../../assets/cesium_images/重点人员.png";

import addictsPeople from "../../../assets/cesium_images/吸毒人员.png"
import cultPeople from "../../../assets/cesium_images/邪教人员.png"
import lettersPeople from "../../../assets/cesium_images/信访人员.png"
import mentalPatient from "../../../assets/cesium_images/精神病.png"


import oldMenJson from "../../../assets/json/newOldMen.json";
var tiles = null;
var viewer = null;

export default {
  name: "personnelDistribution",
  
  components: {
    OldMenDialog,
    FireDialog,
    peopleDialog,
    IllegalBuilding,
    PartyDialog,
    RightPanel,
    KeyPeople,
    FireHrydrantDialog,
    AdvancedSearch,
  },
  data() {
    return {
      dtfFeatures: null,
      dftTileset: null,
      theFeature: null,

      SpecialPersonLoctionInfo: [],
      filterLoctionInfo:{},

      selectOptions: [],
      value: "",
      tiltTileset: null,
      infoWindowPosition: null,
      dock: null,
      table: null,
      preSelectedFeature: null,
      oldpreSelectedFeatureColor: null,
      options: {
        enableCompass: true,
        enableZoomControls: true,
        enableCompassOuterRing: true,
      },
      opened: false,
      fireOpened: false,
      popend: false,
      iopend: false,
      partyopend: false,
      ropend: false,
      kopened: false,
      fopened: false,
      keyType: 1,
    };
  },
  mounted() {
    //this.initSeletion();
    // this.selectOptions.push
    this.init();
    

    // this.SelectHouseBySearchProperty();
  },
  methods: {
    FlyTo(feature) {
      if (!feature) {
        feature = this.theFeature;
      }

      if (feature && feature._content && feature._content.tile) {
        //debugger;
        let cartographic = Cesium.Cartographic.fromCartesian(
          feature._content.tile.boundingSphere.center
        );

        // cartographic.height *= 0.5;
        // viewer.camera.flyToBoundingSphere(feature._content.tile.boundingSphere)
        // viewer.camera.flyTo({
        //   destination: feature._content.tile.boundingSphere.center,
        // });
        // var position = viewer.scene.globe.ellipsoid.cartographicToCartesian(
        //   cartographic
        // );

        // var camera = viewer.scene.camera;
        // var heading = camera.heading;
        // var pitch = camera.pitch;

        // var offset = this.offsetFromHeadingPitchRange(
        //   heading,
        //   pitch,
        //   cartographic.height * 2.0
        // );

        // var transform = Cesium.Transforms.eastNorthUpToFixedFrame(position);
        // Cesium.Matrix4.multiplyByPoint(transform, offset, position);

        // camera.flyTo({
        //   destination: position,
        //   orientation: {
        //     heading: heading,
        //     pitch: pitch,
        //   },
        //   easingFunction: Cesium.EasingFunction.QUADRATIC_OUT,
        // });
      }
    },
    offsetFromHeadingPitchRange(heading, pitch, range) {
      pitch = Cesium.Math.clamp(
        pitch,
        -Cesium.Math.PI_OVER_TWO,
        Cesium.Math.PI_OVER_TWO
      );
      heading = Cesium.Math.zeroToTwoPi(heading) - Cesium.Math.PI_OVER_TWO;

      var pitchQuat = Cesium.Quaternion.fromAxisAngle(
        Cesium.Cartesian3.UNIT_Y,
        -pitch
      );
      var headingQuat = Cesium.Quaternion.fromAxisAngle(
        Cesium.Cartesian3.UNIT_Z,
        -heading
      );
      var rotQuat = Cesium.Quaternion.multiply(
        headingQuat,
        pitchQuat,
        headingQuat
      );
      var rotMatrix = Cesium.Matrix3.fromQuaternion(rotQuat);

      var offset = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_X);
      Cesium.Matrix3.multiplyByVector(rotMatrix, offset, offset);
      Cesium.Cartesian3.negate(offset, offset);
      Cesium.Cartesian3.multiplyByScalar(offset, range, offset);
      return offset;
    },

    handleMenuCommand(command) {
      if (this.dtfFeatures) {
        this.SelectHouseBySearchProperty();
      }
    },
    SelectHouseBySearchProperty() {
      console.log("in SelectHouseBySearchProperty()");

      const gidName = "H15-2-1-1"; //"G2-1-204"
      if (this.theFeature) {
        this.theFeature.color = Cesium.Color.RED;
        // viewer.selectedEntity = this.theFeature;
        // viewer.flyTo(this.theFeature.tileset)
        this.FlyTo();
      }
      // if (this.dtfFeatures && this.dtfFeatures.featuresLength) {
      //   let featuresLength = this.dtfFeatures.featuresLength;
      //   for (let i = 0; i < featuresLength; i++) {
      //     let feature = this.dtfFeatures.getFeature(i);
      //     // debugger;
      //     let value = feature.getProperty("gid");
      //     if (value && value == gidName) {
      //       debugger;
      //       feature.color = Cesium.Color.RED;

      //       // viewer.flyTo(feature);
      //     }
      //   }
      // }
      // this.dftTileset.style = new Cesium.Cesium3DTileStyle({
      //   color: {
      //     conditions: [
      //       // ["${Height} >= 100", 'color("purple", 0.5)'],
      //       ["${gid} == ${gidName}", 'color("red")'],
      //       ["true", "rgba(255,255,255,0.5)"],
      //     ],
      //   },
      // show: "${Height} > 0",
      // meta: {
      //   description: '"Building id ${id} has height ${Height}."',
      // },
      // });
    },
    initSeletion() {
      var _this = this;
      debugger
      getSpecialPersonLoction_ZH().then(response =>{
        debugger
        _this.SpecialPersonLoctionInfo = response;
        console.log(_this.SpecialPersonLoctionInfo);
        response.map((man)  => {
          debugger
          //oldMenJson.map((man) => {
          _this.selectOptions.push({
            value: man["姓名"],
            label: man["姓名"],
          });
        });
      });
    },
    selectionChange(value) {
      viewer.flyTo(viewer.entities.getById(value));
    },
    init() {
			Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM';
			
      viewer = new Cesium.Viewer("cesiumContainer", {
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
      // viewer.extend(Cesium.viewerCesiumInspectorMixin)
      // debugger;
      this.initCamera(viewer);
      this.initInfobox(viewer);
      // this.addFire(viewer)

      // var cartesian3 = new Cesium.Cartesian3(530983, 3383756, 0)
      // var cartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian3)
      // var lat = Cesium.Math.toDegrees(cartographic.latitude)
      // var lng = Cesium.Math.toDegrees(cartographic.longitude)
      // var alt = cartographic.height
      // console.log(lat, lng, alt)
    },
    initCamera(viewer) {
      console.log("我要飞起来");
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
          roll: 0,
        },
      });
      var _this = this;
      window.setTimeout(function () {
        _this.add3DtilesDyt(viewer);
        getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "精神病人").map((men)  => {
            _this.addEntity(
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(men["经度"]),
                parseFloat(men["纬度"]),
                parseFloat(men["楼层"]) * 3 + 10
              ),
              men["姓名"],
              mentalPatient
            );
          });
        });
         getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "信访维稳人员").map((men)  => {
            _this.addEntity(
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(men["经度"]),
                parseFloat(men["纬度"]),
                parseFloat(men["楼层"]) * 3 + 10
              ),
              men["姓名"],
              lettersPeople
            );
          });
        });
         getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "邪教人员").map((men)  => {
            _this.addEntity(
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(men["经度"]),
                parseFloat(men["纬度"]),
                parseFloat(men["楼层"]) * 3 + 10
              ),
              men["姓名"],
              cultPeople
            );
          });
        });
        getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "吸毒人员").map((men)  => {
            _this.addEntity(
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(men["经度"]),
                parseFloat(men["纬度"]),
                parseFloat(men["楼层"]) * 3 + 10
              ),
              men["姓名"],
              addictsPeople
            );
          });
        });
      }, 2000);
    },
    addPosition(viewer, xyJson, tJson, tKey) {
      var _this = this;
      tJson.map((jz) => {
        const aPosition = xyJson.filter((h) => {
          return h["GID"] === jz[tKey];
        });
        if (aPosition.length === 0) {
          return;
        }
        const position = aPosition[0];
        const arr = position["GID"].split("-");
        var height = 0;
        if (arr[arr.length - 1].length === 3) {
          height = arr[arr.length - 1].substring(0, 1) * 3 + 10;
        } else {
          height = arr[arr.length - 1].substring(0, 2) * 3 + 10;
        }
        _this.addEntity(
          viewer,
          Cesium.Cartesian3.fromDegrees(
            parseFloat(position["x"]),
            parseFloat(position["y"]),
            height
          ),
          "矫正人员",
          keyPeople
        );
      });
    },
    add3DtilesDyt(viewer) {
			axios.request({
				url: '/3DModelsSetting.json', // 读取public目录下3维模型配置文件
        method: 'get'
			}).then((res) =>{
				var saxcUrl = res.data[0].children[2].url;
				var saxcDthUrl = res.data[1].children[2].url;
				
				featureViewer.install(viewer);
				// 添加倾斜模型
				var _this = this;
				var tiltTileset = new Cesium.Cesium3DTileset({
					url: saxcUrl,
				});

				tiltTileset.readyPromise.then(function (tileset) {
					// _this.addMouseEvent(viewer)
					// 添加导航
					// CesiumNavigation(viewer, options);
					// 初始化弹框
					// initInfowindow(viewer)
					viewer.scene.primitives.add(tileset);
					viewer.flyTo(tileset);

					// _this.$store.dispatch('AddCesiumData', tileset)
					// debugger
					tiles = tileset;
					// tiles = tiltTileset
					console.log("倾斜摄影加载完成", tiles);
				});
				// 添加矢量面分类图层
				var classificationTileset = new Cesium.Cesium3DTileset({
					url: saxcDthUrl,
					// url: 'http://202.114.148.160/saxcDY/tileset.json',
					classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
				});
				classificationTileset.style = new Cesium.Cesium3DTileStyle({
					color: "rgba(255,255,255,0.01)",
				});

				let gidName = "H15-1-4/5-2"; //测试房屋号G8-2-802
				// classificationTileset.style = new Cesium.Cesium3DTileStyle({
				//   color: {
				//     conditions: [
				//       // ["${Height} >= 100", 'color("purple", 0.5)'],
				//       ["${gid} == ${gidName}", 'color("red")'],
				//       ["true", "rgba(255,255,255,0.5)"],
				//     ],
				//   },
				//   // show: "${Height} > 0",
				//   // meta: {
				//   //   description: '"Building id ${id} has height ${Height}."',
				//   // },
				// });

				classificationTileset.readyPromise.then(function (tileset) {
					viewer.scene.primitives.add(tileset);

					_this.dftTileset = classificationTileset;

					tileset.tileLoad.addEventListener((tile) => {
						//tileVisible
						 debugger
						if (tile && tile.content) {
							// debugger;
							_this.dtfFeatures = tile.content;
							console.log("dftfeatures", _this.dtfFeatures.featuresLength);

							let fLength = tile.content.featuresLength;

							for (let i = 0; i < fLength; i++) {
								let feature = tile.content.getFeature(i);
								// debugger;
								let value = feature.getProperty("gid");
								if (value && value == gidName) {
									// debugger;
									// feature.color = Cesium.Color.RED;
									_this.theFeature = feature;
									console.log("find", gidName);
									// viewer.flyTo(feature);
									// _this.FlyTo(feature);
								}
							}
						}
					});

					_this.$notify({
						title: "成功",
						message: "单体化加载完毕",
						type: "success",
					});

					console.log("单体化模型", tileset);
					// var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
					// handler.setInputAction(function(evt) {
					//   var pick = viewer.scene.pick(evt.position)
					//   if (pick) {
					//     if (pick instanceof Cesium.Cesium3DTileFeature) {
					//       // _this.hightLightAndGetProps(pick)
					//       console.log(pick.getPropertyNames())

					//       debugger
					//       pick.color = Cesium.Color.fromAlpha(Cesium.Color.LAWNGREEN, 0.3)
					//     }
					//   }
					// }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
					// viewer.flyTo(classificationTileset)
				});
				// this.addMouseEvent(viewer);
			}).catch(err => {
				console.log(err);
			})
      
    },
    addMouseEvent(viewer) {
      console.log("addmouseevent");
      // this.addPointMoveEvent(viewer);
      this.addLeftClickEvent(viewer);
    },
    addPointMoveEvent(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function (evt) {
        var pick = viewer.scene.pick(evt.endPosition);
        if (pick) {
          // $('#cesiumContainer').css('cursor', 'pointer')
        } else {
          // $('#cesiumContainer').css('cursor', 'default')
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    addLeftClickEvent(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      var _this = this;
      handler.setInputAction(function (evt) {
        var pick = viewer.scene.pick(evt.position);
        console.log("evt,pick", evt, pick);
        if (pick) {
          if (pick instanceof Cesium.Cesium3DTileFeature) {
            // _this.hightLightAndGetProps(pick);

            _this.opened = !_this.opened;
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
            var propertyNames = pick.getPropertyNames();
            // var length = propertyNames.length
            // for (var i = 0; i < length; ++i) {
            //   var propertyName = propertyNames[i]
            //   var newRow = table.insertRow()
            //   var
            //     cell1 = newRow.insertCell()
            //   var cell2 = newRow.insertCell()
            //   cell1.innerHTML = propertyName
            //   cell2.innerHTML = pick.getProperty(propertyName)
            console.log(propertyNames);
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
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    hightLightAndGetProps(tileFeature) {
      if (this.preSelectedFeature instanceof Cesium.Cesium3DTileFeature) {
        this.preSelectedFeature.color = this.oldpreSelectedFeatureColor;
      }
      this.preSelectedFeature = tileFeature;
      this.oldpreSelectedFeatureColor = tileFeature.color;
      // 设置颜色
      tileFeature.color = Cesium.Color.fromAlpha(Cesium.Color.LAWNGREEN, 0.3);
      this.getPropsOf3DTileFeature(tileFeature);
    },
    getPropsOf3DTileFeature(tileFeature) {
      var propertyNames = tileFeature.getPropertyNames();
      var length = propertyNames.length;
      for (var i = 0; i < length; ++i) {
        var propertyName = propertyNames[i];
        console.log(
          propertyName + ": " + tileFeature.getProperty(propertyName)
        );
      }
    },
    consoleTiles() {
      console.log(tiles);
      tiles.show = false;
      // var data = this.$store.dispatch('GetCesiumData')
      // console.log(data)
      // data.show = false
      // data.readyPromise.then(function(tileset) {
      //   console.log(data)
      // })
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
    addFire(viewer) {
      viewer.scene.primitives.add(
        new Cesium.ParticleSystem({
          // image: require('../../../../public/fire.png'),
          image: fire,
          imageSize: new Cesium.Cartesian2(25, 25),
          startScale: 1.0,
          endScale: 4.0,
          // Particle behavior
          particleLife: 1.0,
          speed: 1,
          emissionRate: 50,
          lifetime: 0.1,
          modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(114.340873606, 30.5805503113, 120)
          ),
          mass: 10,
          emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(30.0)),
        })
      );
    },
    initInfobox(viewer) {
      var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      var _this = this;
      handler.setInputAction((movement) => {
        var pickedPrimitive = viewer.scene.pick(movement.position);
        // if (pickedPrimitive.show === true) {
        //   _this.partyopend = !_this.partyopend
        //   return
        // }
        var pickedEntity = Cesium.defined(pickedPrimitive)
          ? pickedPrimitive.id
          : undefined;
        if (Cesium.defined(pickedEntity)) {
           debugger
          if (pickedEntity.label.text._value !== "") {
            _this.opened = !_this.opened;
             debugger
            console.log(pickedEntity.label.text._value, pickedEntity);
             getSpecialPersonLoction_ZH().then(response =>{
                _this.filterLoctionInfo = response.find(item => item["姓名"] === pickedEntity.label.text._value)                       
             });
             return;
          }
          if (pickedEntity.label.text._value === "消防栓") {
            _this.fopened = !_this.fopened;
            // debugger;
            
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
           // debugger;
            _this.iopend = !_this.iopend;
            return;
          }
         // debugger;
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
    asComfirm() {
      var _this = this;
      oldMenJson.map((men) => {
        if (men["姓名"].indexOf("陈") !== -1) {
          _this.addEntity(
            viewer,
            Cesium.Cartesian3.fromDegrees(
              parseFloat(men["经度"]),
              parseFloat(men["纬度"]),
              parseFloat(men["楼层"]) * 3 + 10
            ),
            men["姓名"],
            people
          );
        }
      });
      viewer.flyTo(viewer.entities);
    },
  },
};
</script>

<style scoped>
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

<style>
.cesium-widget-credits {
  display: none !important;
  visibility: hidden !important;
}

.select {
  position: absolute;
  right: 10px;
  top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* .AdvancedSearch {
  position: absolute;
  top: 10px;
  right: 10px;
} */
</style>

