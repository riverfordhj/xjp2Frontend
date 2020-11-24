<template>
	 <div class="selectForm">
				<el-input v-model="filter" placeholder="过滤条件(楼栋，楼层)" style="width: 200px;"  />
				<el-select v-model="buildingsData.buildingValue" placeholder="请选择楼栋"  @change="handleFirstSelect">
					<el-option
						v-for="item in filteredBuildingsData"
						:key="item.id"
						:value="item.buildingName">
					</el-option>
				</el-select>
				<el-select v-model="buildingFloorData.FloorValue" placeholder="请选择楼层"  @change="handleSecondSelect" >
					<el-option
						v-for="item in filteredFloorsInfo"
						:key="item.id"
						:value="item.floorNum">
					</el-option>
				</el-select>
			</div>
</template>

<script>
import { getFloorInfoByBuilding, getBuindingInfoByStatus } from '@/api/company.js';

export default {
	name: 'filterPanel',
	data() {
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
				//debugger;
				let filterArr = this.filter.split(/[，,]/gim);
				return this.buildingFloorData.FloorInfos.filter(item => item.floorNum.indexOf(filterArr[1])!== -1);
			}else{
				return this.buildingFloorData.FloorInfos;
			}
			
		}
	},
	methods: {
		//请求后端楼栋数据
		getBuildings() {
			getBuindingInfoByStatus().then(res => {
				this.buildingsData.buildings = res;
			}).catch(err =>{
				console.log(err);
			})
		},
		handleFirstSelect (curValue){
			this.$emit('firstSelectChange', curValue, this.buildingsData.buildings, this.buildingFloorData)
		},
		handleSecondSelect (curValue){
			this.$emit('secondSelectChange', curValue, this.buildingFloorData.FloorInfos);
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