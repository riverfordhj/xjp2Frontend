<template>
	<div>
		<div id="cesiumContainer"></div>
		<company-info-panel :company-datas="companyDatas"></company-info-panel>
	</div>
</template>

<script>
import { interactOperate } from './interactivate.js';
import companyInfoPanel from './components/companyInfoPanel.vue';

var Cesium = require('cesium/Cesium');
import 'cesium/Widgets/widgets.css';

// let tilesets = new Map();

export default {
	name: 'buildingEcoMap',
	data () {
		return {
			viewer: null,
			dataSet: [
				{
					url: 'http://localhost:80/xjp/3D/sanjiaolu/st-sanjiaolu/tileset.json'
				},
				{
					url: 'http://localhost:80/xjp/3D/sanjiaolu/v+/tileset.json'
				}
			],
			companyDatas:{
				show: false,
				title: '',
				compaiesFullInfo: [],
				interactOperate
			}
		}
	},
	components: {
		companyInfoPanel
	},
	mounted() {
		this.init();
		this.loadData();
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
		},
		loadData (){
			this.load3DTiles(this.viewer, this.dataSet[0].url, false, null, null); 
			this.load3DTiles(
				this.viewer, 
				this.dataSet[1].url,   
				true,
				Cesium.ClassificationType.CESIUM_3D_TILE,
				new Cesium.Cesium3DTileStyle({
					color: 'rgba(255,255,255,0.01)'
				}
			));
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
        if (isFlyto){
					viewer.flyTo(tileset);
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