<template>
	<div v-show="companyDataForms.show">
		<dialog-drag
      id="dialog-1"
      class="dialog-3"
      :title="companyInFloorTitle"
      pinned="false"
      :options="option"
      @close="close"
    >
      <!-- <el-scrollbar :native="false" style="height:100%, height: 100%"> -->
		  <div class="selectForm">
				<el-input v-model="filter" placeholder="过滤条件(楼栋，楼层)" style="width: 200px;"  />
				<el-select v-model="buildingsData.buildingValue" placeholder="请选择楼栋"  @change="getFloorInfos">
					<el-option
						v-for="item in filteredBuildingsData"
						:key="item.id"
						:value="item.buildingName">
					</el-option>
				</el-select>
				<el-select v-model="buildingFloorData.FloorValue" placeholder="请选择楼层"  @change="flyToTarget" >
					<el-option
						v-for="item in filteredFloorsInfo"
						:key="item.id"
						:value="item.floorNum">
					</el-option>
				</el-select>
			</div>
      <el-table :data="companyDataForms.compaiesFullInfo" height="550" border style="width: 100%">
				<el-table-column prop="buildingName" label="楼宇名称" width="120">
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" width="180">
				</el-table-column>
				<el-table-column prop="unifiedSocialCreditCode" label="统一社会信用代码" width="180">
				</el-table-column>
				<el-table-column prop="actualOfficeAddress" label="实际办公地址" width="180">
				</el-table-column>
				<el-table-column prop="registeredCapital" label="注册资本(万元)" width="120">
				</el-table-column>
				<el-table-column prop="legalRepresentative" label="公司法人代表" width="140">
				</el-table-column>
				<el-table-column prop="contacts" label="联系人" width="80">
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" width="80">
				</el-table-column>
				<el-table-column prop="businessDirection" label="企业主营方向" width="220">
				</el-table-column>
				<el-table-column prop="registeredAddress" label="工商注册登记地" width="180">
				</el-table-column>
				<el-table-column prop="taxStatisticsArea" label="税收统计区" width="120">
				</el-table-column>
				<el-table-column prop="corporateTax" label="企业税收额（万元)" width="140"/>
				<el-table-column prop="floor" label="楼层" width="80"/>
				<el-table-column prop="category" label="租赁/购买" width="100"/>
     
      </el-table>
    <!-- </el-scrollbar> -->
    </dialog-drag>
	</div>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';
import { getFloorInfoByBuilding, getCompanyBuildings } from '@/api/company.js';

export default {
	name: 'companyInfoPanel',
	components: {
    DialogDrag
	},
	props: {
		companyDatas: {
      type: Object,
      default: function() {
        return {}
      }
    }
	},
	data(){
		return {
			option: { top: 250, left: 20, height: 650, width: 1200, buttonPin: false },
			companyDataForms: this.companyDatas,
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
		companyInFloorTitle(){
			return '楼层入驻公司信息： ' + this.companyDataForms.title;
		},
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
		close (){
      this.companyDatas.show = false
		},
		//请求后端楼栋数据
		getBuildings() {
			getCompanyBuildings().then(res => {
					this.buildingsData.buildings = res;
			}).catch(err =>{
				console.log(err);
			})
		},
		getFloorInfos (curValue){
			const targetBuilding = this.buildingsData.buildings.find(item => item.buildingName === curValue);
			//向后端请求目标楼栋的楼层信息
			getFloorInfoByBuilding(targetBuilding.id).then(res => {
				this.buildingFloorData.FloorInfos = res[0].floor;
			}).catch(err => {
				console.log(err);
			})
		},
		//定位到选定楼层
		flyToTarget (curFloorNum){
			const curFloorInfo = this.buildingFloorData.FloorInfos.find(item => item.floorNum === curFloorNum);
			if(curFloorInfo){
				const position = {
					long: curFloorInfo.lat,
					lat: curFloorInfo.long,
					height: curFloorInfo.height
				};
				this.companyDatas.interactOperate.FlytoFloor(position, curFloorInfo.floorNum);
			}
		}
	}
}
</script>
<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
 .selectForm{
	 margin-top: -5px;
	 margin-bottom: 8px;
 }
</style>