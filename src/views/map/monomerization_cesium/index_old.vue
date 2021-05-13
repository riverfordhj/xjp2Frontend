<template>
  <div>
    <div id="cesiumContainer" ref="cesiumContainer" />
    <div class="mainMenu">
      <el-dropdown @command="handleMenuCommand">
        <el-button type="primary">
          菜单
          <i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="showLayer">检索</el-dropdown-item>
          <el-dropdown-item command="showLayer2">类别</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <dialog-drag 
        v-show="dialogVisible"
        id="dialog-2"
        title="检索"
        pinned="false"
        :options="{ top: 60, width: 330, buttonPin: false }"
        @close="closeLayerPanel"
    >
      <el-form  :rules="rules">
         <el-form-item  prop="entityName">
            <el-input type="text" v-model="entityName"  placeholder="请输入姓名/电话/身份证" style="width: 200px; height:30px;"  clearable @keyup.enter.native="asComfirm" />
            <el-button type="primary"  icon="el-icon-search" @click="asComfirm">查询</el-button>
         </el-form-item>
      </el-form>
    </dialog-drag>

    <dialog-drag 
      v-show="dialogVisible2"
      id="dialog-1"
      class="dialog-3"
      title="特殊人群"
      pinned="false"
      :options="{ top: 60, width: 330, buttonPin: false }"
      @close="closeLayerPanel2"
    >
       <el-tree  
         show-checkbox 
         :data="typeData" 
         :props="defaultProps" 
         :default-expanded-keys="[1]"
         :default-checked-keys="defaultChecked"
          node-key="id"
         @check-change="handleCheckChange">

       </el-tree>
    
    </dialog-drag>

    <OldMen-Dialog :opened="opened" :locationinfo="filterLoctionInfo" />
    <Fire-Dialog :fire-opened="fireOpened" />
    <people-Dialog :popend="popend" />
    <IllegalBuilding :iopend="iopend" />
    <PartyDialog :partyopend="partyopend" />
  </div>
</template>

<script>

import axios from 'axios'
import DialogDrag from 'vue-dialog-drag'
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

import {featureViewer } from './cesium.js'
import { interactOperate } from '../person-house/interactivate3DTiles.js'
import { getSpecialPersonLoction_ZH } from '@/api/person.js';



import fire from "../../../assets/cesium_images/fire.png";

import addictsPeople from "../../../assets/cesium_images/吸毒人员.svg"
import cultPeople from "../../../assets/cesium_images/邪教人员.svg"
import lettersPeople from "../../../assets/cesium_images/信访人员.svg"
import mentalPatient from "../../../assets/cesium_images/精神病.svg"

var tiles = null;
var viewer = null;

export default {
  name: "personnelDistribution",
  
  components: {
    DialogDrag,
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
      rules:{
        entityName:[
          { required: true, message: '不能为空', trigger: 'blur' }
        ]

      },
      defaultChecked: [], // 模型树check状态
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      typeData:[
        {
            id: 1,
            label:"特殊人群类别",
            children:[
            {
              id:11,
              label:"精神病人"
            },
            {
              id:12,
              label:"信访维稳人员"
            },
              {
              id:13,
              label:"邪教人员"
            },
            {
              id:14,
              label:"吸毒人员"
            }
            ],
        }],
      dialogVisible: false,
      dialogVisible2: false,
      dtfFeatures: null,
      dftTileset: null,
      theFeature: null,
      entityName:'',

      filterLoctionInfo:{},

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
    this.init();
  },
  methods: {
       handleMenuCommand(command) {
      if (command === 'showLayer') {
        this.dialogVisible = true
      }
       if (command === 'showLayer2') {
        this.dialogVisible2 = true
      }
    },
    // 关闭图层面板
    closeLayerPanel() {
      this.dialogVisible = false
    },
    closeLayerPanel2() {
      this.dialogVisible2 = false
    },
    //树形菜单checkbox
    handleCheckChange(data, checked, indeterminate) {
      debugger
          if(data.id == "11" ){
            this.getMental();
            viewer.entities.show = checked;
            if(!checked){
              this.getComplaint();
              this.getHeresy();
              this.getDrug();
            }
            
          }else if(data.id == "12" ){
            this.getComplaint();
            viewer.entities.show = checked;
          }else if(data.id == "13" ){
            this.getHeresy();
            viewer.entities.show = checked;
          }else if(data.id == "14" ){
            this.getDrug();
            viewer.entities.show = checked;
          }
    
      console.log(data.label)
      console.log(data, checked, indeterminate);
    },
    FlyTo(feature) {
      if (!feature) {
        feature = this.theFeature;
      }

      if (feature && feature._content && feature._content.tile) {
        let cartographic = Cesium.Cartographic.fromCartesian(
          feature._content.tile.boundingSphere.center
        );
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
        requestRenderMode: true,
     
      });
      this.initCamera(viewer);
      this.initInfobox(viewer);
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
        console.log(1);
          console.log(viewer)
          // _this.getMental();
          // _this.getComplaint();
          //_this.getHeresy();
          // _this.getDrug();
          console.log(viewer.entities.values);

      }, 1000);
    },
    //获取后台数据，过滤精神病并渲染到页面上
    getMental(){
      var _this = this;
      getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "精神病人").forEach(item => {
            _this.addEntity(
              item["身份证号码"],
              item["联系电话"],
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(item["经度"]),
                parseFloat(item["纬度"]),
                parseFloat(item["楼层"]) * 3 + 10
              ),
              item["姓名"],
              mentalPatient
            );
          });
        }).catch(err =>{
          console.log(err);
        });
        return
    },
    //获取后台数据，过滤信访维稳人员并渲染到页面上
    getComplaint(){
      var _this = this;
      getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "信访维稳人员").forEach((item)  => {
            _this.addEntity(
              item["身份证号码"],
              item["联系电话"],
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(item["经度"]),
                parseFloat(item["纬度"]),
                parseFloat(item["楼层"]) * 3 + 10
              ),
              item["姓名"],
              lettersPeople
            );
          });
        }).catch(err =>{
          console.log(err);
        });
    },
    //获取后台数据，过滤邪教人员并渲染到页面上
    getHeresy(){
      var _this = this;
      getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "邪教人员").forEach((item)  => {
            _this.addEntity(
              item["身份证号码"],
              item["联系电话"],
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(item["经度"]),
                parseFloat(item["纬度"]),
                parseFloat(item["楼层"]) * 3 + 10
              ),
              item["姓名"],
              cultPeople
            );
          });
        }).catch(err =>{
          console.log(err);
        });
    },
    //获取后台数据，过滤吸毒人员并渲染到页面上
    getDrug(){
      var _this = this;
      getSpecialPersonLoction_ZH().then(response =>{
          response.filter(item => item["类型"] === "吸毒人员").forEach((item)  => {
            _this.addEntity(
              item["身份证号码"],
              item["联系电话"],
              viewer,
              Cesium.Cartesian3.fromDegrees(
                parseFloat(item["经度"]),
                parseFloat(item["纬度"]),
                parseFloat(item["楼层"]) * 3 + 10
              ),
              item["姓名"],
              addictsPeople
            );
          });
        }).catch(err =>{
          console.log(err);
        });
    },
    getSpecialType(value){
      console.log(value);
      debugger
      if(value == "精神病人"){
        this.getMental();
        // this.getComplaint();
        // this.getHeresy();
        // this.getDrug();
      }

    },
    // addPosition(viewer, xyJson, tJson, tKey) {
    //   var _this = this;
    //   tJson.map((jz) => {
    //     const aPosition = xyJson.filter((h) => {
    //       return h["GID"] === jz[tKey];
    //     });
    //     if (aPosition.length === 0) {
    //       return;
    //     }
    //     const position = aPosition[0];
    //     const arr = position["GID"].split("-");
    //     var height = 0;
    //     if (arr[arr.length - 1].length === 3) {
    //       height = arr[arr.length - 1].substring(0, 1) * 3 + 10;
    //     } else {
    //       height = arr[arr.length - 1].substring(0, 2) * 3 + 10;
    //     }
    //     _this.addEntity(
    //       viewer,
    //       Cesium.Cartesian3.fromDegrees(
    //         parseFloat(position["x"]),
    //         parseFloat(position["y"]),
    //         height
    //       ),
    //       "矫正人员",
    //       keyPeople
    //     );
    //   });
    // },
    add3DtilesDyt(viewer) {
			axios.request({
				url: '/3DModelsSetting.json', // 读取public目录下3维模型配置文件
        method: 'get'
			}).then((res) =>{
				var saxcUrl = res.data[0].children[2].url;
				var saxcDthUrl = res.data[1].children[2].url;
				
		    featureViewer.install(viewer);
        //interactOperate.install(viewer);
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

				classificationTileset.readyPromise.then(function (tileset) {
					viewer.scene.primitives.add(tileset);

					_this.dftTileset = classificationTileset;

					tileset.tileLoad.addEventListener((tile) => {
						//tileVisible
						 
						if (tile && tile.content) {

							_this.dtfFeatures = tile.content;
							console.log("dftfeatures", _this.dtfFeatures.featuresLength);

							let fLength = tile.content.featuresLength;

							for (let i = 0; i < fLength; i++) {
								let feature = tile.content.getFeature(i);
	
								let value = feature.getProperty("gid");
								if (value && value == gidName) {
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
		
				});
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

            var propertyNames = pick.getPropertyNames();

            console.log(propertyNames);
          }
        } else {
          // infoWindowPosition = null
          // $('#bubble').hide()
        }
  
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
    addEntity(personID, phone, viewer, postion, text, img) {
      viewer.entities.add({
        // id: text,
        id:personID,
        phone:phone,
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
          pixelOffset: new Cesium.Cartesian2(20, -2), // 偏移量
          disableDepthTestDistance: 1000000000, // 优先级
          scale: 0.5,
        },
        billboard: {
          image: img, // default: undefined
          text: "123",
          show: true, // default
          width: 55,
          height: 55,
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
        var pickedEntity = Cesium.defined(pickedPrimitive)
          ? pickedPrimitive.id
          : undefined;
        if (Cesium.defined(pickedEntity)) {
          // 点击页面上的实体图片返回相关信息pickedEntity
          if (pickedEntity.label.text._value !== "") {
            _this.opened = !_this.opened;
            console.log(pickedEntity.label.text._value, pickedEntity);
             getSpecialPersonLoction_ZH().then(response =>{
                _this.filterLoctionInfo = response.find(item => item["姓名"] === pickedEntity.label.text._value)                       
             });
             return;
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    asComfirm() {
      var _this = this;
      var arr = viewer.entities.values;
      var entity = arr.find(o =>(o.label.text._value == _this.entityName || o.id ==  _this.entityName || o.phone == _this.entityName && o.id != '' && o.phone != '' ));
      if(entity){
        debugger
        viewer.flyTo(entity);
      }else{
         this.$message.error('请输入正确姓名、身份证、电话');
      }
      
    },
  },
};
</script>

<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

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

