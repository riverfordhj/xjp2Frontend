<template>
	<div>
		<div id="cesiumContainer"></div>
		<company-info-panel :company-datas="companyDatas"></company-info-panel>
	</div>
</template>

<script>
import axios from 'axios';
import { interactOperate } from './interactivate.js';
import companyInfoPanel from './companyInfoComponents/companyInfoPanel.vue';

var Cesium = require('cesium/Cesium');
import 'cesium/Widgets/widgets.css';

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
			companyDatas:{
				show: false,
				title: '',
				buildingName:'',
				companiesFullInfo: [],
				interactOperate,
				clearFilter: false
			},
			modelTreeData: [],

			positionValue: {},
			FloorValue: ''
		}
	},
	components: {
		companyInfoPanel
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
    }
		
	}
}
</script>

<style scoped>
	#cesiumContainer {
		height: calc(100vh - 84px);
	}
</style>