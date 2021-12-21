<template>
	 <div class="selectForm" >
				<el-input v-model="filter" placeholder="过滤条件(楼栋，楼层)" style="width: 200px;" size="small"  />
				<el-select v-model="buildingsData.buildingValue"  placeholder="请选择楼栋"  @change="handleFirstSelect">
					<el-option
						v-for="item in filteredBuildingsData"
						:key="item.id"
						:value="item.buildingName">
					</el-option>
				</el-select>
				<el-select v-model="buildingFloorData.FloorValue" clearable  placeholder="请选择房间"  @change="handleSecondSelect" >

					<el-option
						v-for="item in filteredFloorsInfo"
						:key="item.id"
						:value="item.name">
					</el-option>
				</el-select>
			</div>
</template>

<script>
import { getBuildings } from '@/api/company.js';

export default {
	name: 'filterPanel',
	data() {
		return {
			buildingsData: {
				buildingValue: '',
				buildings: [],
				originBuilidingValue: ''
			},
			buildingFloorData: {
				FloorValue: '',
				FloorInfos: [],
				roomName:[],
			},
			filter:'',
			
		}
	},
	created(){
		  this.getBuildings();
	},	
	computed:{
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
				let filterArr = this.filter.split(/[，,]/gim);
				return this.buildingFloorData.roomName.filter(item => item.name.indexOf(filterArr[1]) !== -1);
			}else{
				return this.buildingFloorData.roomName;
			}
		}
	},
	methods: {
		//请求后端楼栋数据
		getBuildings() {
			getBuildings().then(res => {
				this.buildingsData.buildings = res;
			}).catch(err =>{
				console.log(err);
			})
		},
		handleFirstSelect (curValue){
			this.buildingFloorData.FloorValue = '';
			this.$emit('firstSelectChange', curValue,  this.buildingFloorData);
			
		},
		handleSecondSelect (curValue){
			this.$emit('secondSelectChange', this.buildingsData.buildingValue,curValue);
		},
		clearFilterPanel (){
			console.log('this is clearFilterPanel')
			this.buildingFloorData.FloorValue = '';
			this.buildingsData.buildingValue = '';
		}
	}
}
</script>

<style scoped>
 .selectForm{
	 margin-top: -5px;
	 margin-bottom: 8px;
 }
</style>