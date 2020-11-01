<template>
	<div>
		<div class="selectForm">
			<el-input v-model="filter" placeholder="过滤条件(楼栋，楼层)" style="width: 200px;" />
			<el-select v-model="buildingsData.buildingValue" placeholder="请选择楼栋"  @change="getFloorInfos">
				<el-option
					v-for="item in filteredBuildingsData"
					:key="item.id"
					:value="item.buildingName">
				</el-option>
			</el-select>
			<el-select v-model="buildingFloorData.FloorValue" placeholder="请选择楼层" clearable @change="getCompanyInfoByFloor" @clear="removeFloorCondition">
				<el-option
					v-for="item in filteredFloorsInfo"
					:key="item.id"
					:value="item.floorNum">
				</el-option>
			</el-select>
			<el-button id="search_all" class="bt-request"  type="primary" icon="el-icon-search" @click="showWholeCompanyInfo">统计全部公司信息</el-button>
		</div>
		<div id="output"></div>
	</div>
</template>

<script>
const $ = require('jquery')
import 'jqueryui/jquery-ui'
// import jquery from 'jquery'
import 'pivottable/dist/pivot.css'
import 'pivottable'
import d3 from 'd3'
import c3 from 'c3'
import {c3_renderers} from '../c3_renderers'

import { getFloorInfoByBuilding, getCompanyBuildings, getInfoByFloor, getCompanysByBuilding, getCompanyInfo } from '@/api/company.js';
import { flatCompanyInfo } from '@/utils/tools.js'

export default {
	name: 'IqueryBuildingEco',
	data(){
		return {
			buildingsData: {
				buildingValue: '',
				buildings: []
			},
			buildingFloorData: {
				FloorValue: '',
				FloorInfos: []
			},
			filter:'',
			selectedValues:{
				buildingName:'',
				floor: ''
			},
			// selectedValues:{
			// 	selectedBuildingName: '',
			// 	selectedFloorNum: ''
			// },
			companyInfoInFloor: null,
			companyInfoInBuilding: null,
			wholeCompanyInfo: null,
			renderers: null
		};
	},
	computed: {
		filteredBuildingsData(){
			if(this.filter){
				//debugger;
				let filterArr = this.filter.split(/[，,]/gim);
				return this.buildingsData.buildings.filter(item => item.buildingName.indexOf(filterArr[0]) !== -1);
			}else{
				return this.buildingsData.buildings;
			}
		},
		filteredFloorsInfo(){
			if(this.filter){
				//debugger;
				let filterArr = this.filter.split(/[，,]/gim);
				return this.buildingFloorData.FloorInfos.filter(item => item.floorNum.indexOf(filterArr[1])!== -1);
			}else{
				return this.buildingFloorData.FloorInfos;
			}
			
		}
	},
	created (){
		c3_renderers.call(this, $, c3);
		this.renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers);
		
		this.getBuildings();
		this.getWholeCompanyInfo();
	},
	methods: {
		getBuildings() {
			//请求后端楼栋数据，并统计显示
			getCompanyBuildings().then(res => {
				this.buildingsData.buildings = res;
			}).catch(err =>{
				console.log(err);
			});
		},
		getWholeCompanyInfo(){
			//请求所有公司信息, 并统计显示
			getCompanyInfo().then(res =>{
				this.wholeCompanyInfo = flatCompanyInfo(res);
				this.setPivot(this.wholeCompanyInfo);
			}).catch(err =>{
				console.log(err);
			})
		},
		getFloorInfos (curBuildingName){
			//当前楼栋名与上一个选择的楼栋名不同时，再发送请求
			if(curBuildingName !== this.selectedValues.buildingName ){
				this.selectedValues.buildingName = curBuildingName;

				const targetBuilding = this.buildingsData.buildings.find(item => item.buildingName === curBuildingName);
				//向后端请求目标楼栋的楼层信息
				getFloorInfoByBuilding(targetBuilding.id).then(res => {
					this.buildingFloorData.FloorInfos = res[0].floor;
				}).catch(err => {
					console.log(err);
				});
				
				this.getCompanyInfoByBuilding(targetBuilding.id);	
			}else{
				this.setPivot(this.companyInfoInBuilding);
			}
			
		},
		getCompanyInfoByBuilding(buildingId){
			//请求指定楼栋中的公司信息，并统计显示
			getCompanysByBuilding(buildingId).then(res => {
				this.companyInfoInBuilding = flatCompanyInfo(res);
				this.setPivot(this.companyInfoInBuilding);
				debugger;
			}).catch(err => {
				console.log(err);
			})
		},
		getCompanyInfoByFloor (curFloorNum){
			console.log(curFloorNum);
			if(curFloorNum !== this.selectedValues.floor && curFloorNum !== ''){
				this.selectedValues.floor = curFloorNum;
				//请求指定楼层中的公司信息，并统计显示
				getInfoByFloor(this.selectedValues).then(res =>{
					this.companyInfoInFloor = flatCompanyInfo(res);
					this.setPivot(this.companyInfoInFloor);
				})
			}else{
				this.setPivot(this.companyInfoInBuilding);
			}
		},
		//剔除指定楼层的条件，回退到仅指定楼栋条件，统计并显示
		removeFloorCondition(){
			this.setPivot(this.companyInfoInBuilding);
		},
		//查询所有
		showWholeCompanyInfo() {
			if(this.wholeCompanyInfo){
				this.setPivot(this.wholeCompanyInfo);
			}else{
				this.getWholeCompanyInfo();
			}
		},
		//
    setPivot(data) {
      const self = this;
      $('#output').pivotUI(
        data,
        {
          renderers: self.renderers
        }
      )
    }
	}
}
</script>

<style scoped>

 .selectForm{
	 margin: 5px 8px;
 }
 .bt-request{
	 display: inline-block;
 }
</style>