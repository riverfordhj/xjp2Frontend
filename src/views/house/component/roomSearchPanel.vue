<template>
	<div class="filterContainer">
		<el-input v-model="filter" placeholder="过滤(社区，网格，楼栋)" style="width: 180px;" />
		<el-select v-model="community" placeholder="社区" clearable style="width: 110px"  @change="getNetGridData">
			<el-option v-for="item in filteredCommunities" :key="item.id" :label="item.name" :value="item.id" />
		</el-select>
		<el-select v-model="netGrid" placeholder="网格" clearable style="width: 110px"  @change="getBuildingsData">
		<el-option v-for="item in filteredNetGrids" :key="item.id" :label="'网格' + item.name" :value="item.id" />
		</el-select>
		<el-select v-model="building" placeholder="楼栋" clearable  style="width: 180px" @change="getRoomNameList">
			<el-option v-for="item in filteredBuildings" :key="item.id" :label="item.address + '-' + item.name + '栋'" :value="`${item.name}-${item.address}`" />
		</el-select>
		<el-button  type="primary" icon="el-icon-search" @click="getRoomsData">
			查询
		</el-button>
	</div>
</template>

<script>
import { getCommunitys, getNetGridInCommunity,getBuildingInNetGrid, getRoomByBuilding, getPersons, getPersonsByBuilding } from '@/api/person.js';
import { GetRoomsByBuildingData } from '@/api/house.js';

export default {
	name:'roomSeatchPanel',
	data(){
		return {
			filter: '',
			community: '',
			netGrid: '',
			building: '',

			communitysData: [],
			netGridsData: [],
			buildingsData: []
		}
	},
	created(){
		this.getCommunityData();
	},
	mounted(){

	},
	computed:{
		filteredCommunities(){
			if(this.filter){
				let filterArr = this.filter.split(/[，,]/gim);
				return this.communitysData.filter(item => item.name.indexOf(filterArr[0]) !== -1);
			}else{
				return this.communitysData;
			}
		},
		filteredNetGrids(){
			if(this.filter){
				let filterArr = this.filter.split(/[，,]/gim);
				return this.netGridsData.filter(item => item.name.indexOf(filterArr[1]) !== -1);
			}else{
				return this.netGridsData;
			}
		},
		filteredBuildings(){
			if(this.filter){
				let filterArr = this.filter.split(/[，,]/gim);
				return this.buildingsData.filter(item => item.name.indexOf(filterArr[2]) !== -1);
			}else{
				return this.buildingsData;
			}
		}
	},
	methods:{
		//获取社区信息
		getCommunityData(){
			getCommunitys().then(res => {
				this.communitysData = res;
			})
		},
		//获取对应网格信息
		getNetGridData(communityId){
			getNetGridInCommunity(communityId).then(res => {
				this.netGridsData = res;
			})
		},
		//获取对应楼栋信息
		getBuildingsData(netGridId){
			getBuildingInNetGrid(netGridId).then(res => {
				this.buildingsData = res;
			})
		},
		getRoomNameList(){

		},
		//获取对应房屋信息
		getRoomsData(){
			const buildingName = this.building.split('-')[0];
			const address = this.building.split('-')[1];
			GetRoomsByBuildingData(buildingName, address).then(res => {
				this.$emit('transferRoomsData', res);
			})
		}
	}
}
</script>

<style>
 .filterContainer{
	 float: right;
 }
</style>