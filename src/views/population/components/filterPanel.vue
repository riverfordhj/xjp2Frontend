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
				:value="item.buildingName">
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
		buildingSelected(buildingName){
			//根据网格、楼栋，请求房间数据
			GetRoomsByBuildingAndNetgrid(buildingName).then(res => {
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
			this.currentInfo.currentRoomName = '';
			this.fliterOptionsChanged();
		},
		handleRoomSelectClear(){
			this.fliterOptionsChanged();
		},
		fliterOptionsChanged(){
			this.$emit('transferBuildingAndRoom', this.currentInfo);
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