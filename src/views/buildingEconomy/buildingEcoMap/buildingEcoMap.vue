<template>
	<div>
		<div id="cesiumContainer" ref="cesiumContainer" />
		<div class="mainMenu">
						<el-button
							type="primary"
							icon="el-icon-info" 
							@click="gettaxtoppoint()"
						>
							税收前十
						</el-button>
						<el-button
							type="primary"
							icon="el-icon-info" 
							@click="getrevenuetoppoint()"
						>
							营收前十
						</el-button>
    </div>
		<company-info-panel :company-datas="companyDatas"></company-info-panel>
    <taxtopPointDialog :opened="companyDatas.opened" :taxpointinfo ="companyDatas.taxinfo" />
    <revenuetopPointDialog :opened1="companyDatas.opened1" :revenuepointinfo ="companyDatas.revenueinfo" />
	</div>
</template>

<script>
import axios from 'axios';
import { interactOperate } from './interactivate.js';
import companyInfoPanel from './companyInfoComponents/companyInfoPanel.vue';

var Cesium = require('cesium/Cesium');
import 'cesium/Widgets/widgets.css';
import TaxTop from "../../../assets/cesium_images/总税收.svg"
import RevenueTop from "../../../assets/cesium_images/总营收.svg"
import {GetTaxTopOnMap } from '@/api/company.js'
import { GetRevenueTopOnMap } from '@/api/company.js'
import taxtopPointDialog from './companyInfoComponents/taxtopPointDialog.vue'
import revenuetopPointDialog from './companyInfoComponents/revenuetopPointDialog.vue'

// let tilesets = new Map();

export default {
	name: 'buildingEcoMap',
	data () {
		return {
			viewer: null,
			// dataSet: [
			// 	{
			// 		url: 'http://localhost:80/xjp/3D/sanjiaolu/st-sanjiaolu/tileset.json'
			// 	},
			// 	{
			// 		url: 'http://localhost:80/xjp/3D/sanjiaolu/v+/tileset.json'
			// 	}
			// ],
      taxtopPoint:[],
      revenuetopPoint:[],
			companyDatas:{
				show: false,
        opened: false,
				opened1: false,
				title: '',
				buildingName:'',
				companiesFullInfo: [],
				interactOperate,
				clearFilter: false,
				activeName: '',
        taxinfo:{},
				revenueinfo:{},
			},
			modelTreeData: [],

			positionValue: {},
			FloorValue: ''
		}
	},
	components: {
		companyInfoPanel,
		taxtopPointDialog,
		revenuetopPointDialog,
	},
	mounted() {
		this.init();
		this.loadData();
		debugger
		this.bus.$on('deliveryPositionInfo', (pos,floorNum) =>{
			debugger
			this.FloorValue = floorNum;	
			console.log('I get it');
			debugger;
			this.positionValue = {
					long: pos.long,
					lat: pos.lat,
					height: pos.height
			};
			// this.$nextTick(this.companyDatas.interactOperate.FlytoFloor(position, floorNum));
			debugger
			this.companyDatas.interactOperate.FlytoFloor(this.positionValue,this.FloorValue);
		})
	},
	methods: {
		gettaxtoppoint(){
			this.viewer.entities.removeAll();
			this.getTaxTopData()
		},
		getrevenuetoppoint(){
			this.viewer.entities.removeAll();
			this.getRevenueTopData()
		},
		init (){
			Cesium.Ion.defaultAccessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjMyYjZiMC1lZmY1LTQzNmEtODg1NS01NmQzMmE2NWY2ZjMiLCJpZCI6NDQ1MSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0MDg4NTM2Mn0.7OzWWlmUmJv_EJo0RFpuiL2G_KLgZBENAAXOgU1O1qM'

      this.viewer = new Cesium.Viewer('cesiumContainer', {
        shouldAnimate: true,
        baseLayerPicker: false,
        fullscreenButton: false,
        sceneModePicker: false,
        timeline: false,
        geocoder: false,
        homeButton: false,
        navigationHelpButton: false,
        animation: false,
        infoBox: true,
        requestRenderMode: true
			});
			this.viewer.terrainProvider = Cesium.createWorldTerrain();//使用官方的地形图层
		},
		loadData (){
			axios.request({
				url: '/3DModelsSetting.json', // 读取public目录下3维模型配置文件
        method: 'get'
			}).then((res) =>{
				debugger
				this.modelTreeData = res.data;
				
				var st_sanjiaolu = this.modelTreeData[2].children[0].url;
				var dth_V = this.modelTreeData[3].children[0].url;

				this.load3DTiles(this.viewer, st_sanjiaolu, false, null, null); 
				this.load3DTiles(
					this.viewer, 
					dth_V,   
					true,
					Cesium.ClassificationType.CESIUM_3D_TILE,
					new Cesium.Cesium3DTileStyle({
						// color: 'rgba(255,55,255,0.1)'
						color: 'rgba(255,255,255,0.01)'
					}
				));
			})
		
			this.companyDatas.interactOperate.install(this.viewer, this.companyDatas); 
			
		},
		load3DTiles(viewer, url, isFlyto, classificationType, style) {
      var tiltTileset = null

			tiltTileset = new Cesium.Cesium3DTileset({
				url: url
			})
       // tiltTileset.classificationType = classificationType;
      tiltTileset.style = style;

      tiltTileset.readyPromise.then((tileset) => {
        viewer.scene.primitives.add(tileset)
				// 如默认tree中勾选，设置模型可见
				var boundingSphere = tileset.boundingSphere;
				var hpr = new Cesium.HeadingPitchRange(0.0, -0.5, boundingSphere *2);
        if (isFlyto){
					viewer.camera.flyToBoundingSphere(boundingSphere, hpr);
				}
				
      })
    },
    //获取后台数据，税收前十 添加entity标记
    getTaxTopData(){
        var _this = this;
        GetTaxTopOnMap().then(response =>{
           response.forEach(item =>{
            debugger
                _this.addEntity(
                    this.viewer,
                    Cesium.Cartesian3.fromDegrees(
                      //114.31988525390625, 30.577434539794922, 60),
                        parseFloat(item["longitude"]),
                        parseFloat(item["latitude"]),
                        parseFloat(item["height"]) 
                     ),
                    item.name,   //item.type,'里斯'
										item.sign,
                    TaxTop
                );
                  console.log(item);
           })  
        }).catch(err =>{
            console.log(err);
        });
    },
    //获取后台数据，营收前十 添加entity标记
    getRevenueTopData(){
        var _this = this;
        GetRevenueTopOnMap().then(response =>{
           response.forEach(item =>{
            debugger
                _this.addEntity1(
                    this.viewer,
                    Cesium.Cartesian3.fromDegrees(
                      //114.31988525390625, 30.577434539794922, 60),
                        parseFloat(item["longitude"]),
                        parseFloat(item["latitude"]),
                        parseFloat(item["height"]) 
                     ),
                    item.name,   //item.type,'里斯'
										item.sign,
                    RevenueTop
                );
                  console.log(item);
           })  
        }).catch(err =>{
            console.log(err);
        });
    },
    addEntity(viewer,postion, text, sign, img) {
        viewer.entities.add({
            // id: text,
            // id:personID,
            // phone:phone,
            position: postion,
						sign : "tax",
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
            },
        });
    },
    addEntity1(viewer,postion, text, sign, img) {
        viewer.entities.add({
            // id: text,
            // id:personID,
            // phone:phone,
            position: postion,
						sign : "revenue",
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
            },
        });
    },
	}
}
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