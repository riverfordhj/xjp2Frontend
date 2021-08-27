<template>
	<div class="filter-panel">
		<el-input v-model="filter" placeholder="过滤条件(楼栋,房间)" style="width: 160px;"  clearable />
		<el-select 
		  class="filter-select"
			v-model="currentInfo.currentBuildingName" 
			placeholder="请选择(楼栋)" 
			clearable 
			@change="buildingSelected" 
			@clear="handleBuildingSelectClear"
			style="width:160px"
		>
			<el-option
				v-for="item in filteredBuildingsData"
				:key="item.id"
				:label="`${item.address}-${item.buildingName}栋`"
				:value="item.address + '-'+ item.buildingName">
			</el-option>
		</el-select>
		<el-select 
	   	class="filter-select"
		  v-model="currentInfo.currentRoomName" 
			placeholder="请选择(房间)"
			clearable 
			@change="roomSelected" 
			@clear="handleRoomSelectClear"
			style="width:130px"
		>
			<el-option
				v-for="item in filteredRoomsData"
				:key="item.id"
				:value="item.roomName">
			</el-option>
		</el-select>
	</div>
</template>

<script>
import { GetRoomsByBuildingAndNetgrid } from '@/api/person.js';
export default {
	name: 'filterPanel',
	data(){
		return {
			currentInfo: {
				currentBuildingName:'',
				currentRoomName: '',
			},
			filterInfo: {
				currentAddress:'',
				currentBuildingName:'',
				currentRoomName: '',
			},
			buildingsData: [],
			roomsData: [],
      filter:'',

		}
	},
	created(){
		this.bus.$on('buildingsDataReceived', (data) => {
			this.buildingsData = data;
		})
	},
	computed:{
		filteredBuildingsData(){
			if(this.filter){
				let filterArr = this.filter.split(/[，,]/gim);
				return this.buildingsData.filter(item => item.buildingName.indexOf(filterArr[0]) !== -1);
			}else{
				return this.buildingsData;
			}
		},
		filteredRoomsData(){
			if(this.filter){
				let filterArr = this.filter.split(/[，,]/gim);
				return this.roomsData.filter(item => item.roomName.indexOf(filterArr[1]) !== -1);
			}else{
				return this.roomsData;
			}
		},
	},
	methods:{
		buildingSelected(buildingValue){
			//根据网格、楼栋，请求房间数据
			debugger
			const buildingName = buildingValue.split('-')[1];
			const address = buildingValue.split('-')[0];
			GetRoomsByBuildingAndNetgrid(buildingName,address).then(res => {
				this.roomsData = res;
			}).catch(err => {
				console.log(err);
			})
			this.currentInfo.currentRoomName = '';
			this.fliterOptionsChanged();
		},
		roomSelected(){
			this.fliterOptionsChanged();
		},
		handleBuildingSelectClear(){
			debugger
			this.currentInfo.currentBuildingName = '';
			this.currentInfo.currentRoomName = '';
			this.fliterOptionsChanged();
		},
		handleRoomSelectClear(){
			this.fliterOptionsChanged();
		},
		fliterOptionsChanged(){
			debugger
			this.filterInfo.currentAddress = this.currentInfo.currentBuildingName.split('-')[0];
			this.filterInfo.currentBuildingName = this.currentInfo.currentBuildingName.split('-')[1];
			this.filterInfo.currentRoomName = this.currentInfo.currentRoomName;
			if(this.filterInfo.currentBuildingName == undefined){
				this.filterInfo.currentBuildingName= '';
			}
			this.$emit('transferBuildingAndRoom', this.filterInfo);
		}
	}
}
</script>

<style scoped>
  .filter-panel{
		display: inline-block;
	}
	.filter-panel >>> input {
		padding-left: 5px;
	}
</style>