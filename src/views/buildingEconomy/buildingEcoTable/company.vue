<template>
	<div class="container">
	  <div class="toolbar">
			<el-select v-model="value" placeholder="请选择楼栋" clearable @change="selectBuilding" @clear="handleBuildingSelectClear">
				<el-option
					v-for="item in buildingsData"
					:key="item.id"
					:value="item.buildingName">
				</el-option>
 		 	</el-select>
			<el-select v-model="lvalue" placeholder="楼层" clearable style="width: 100px" class="filter-item"  @change="floorNumSelected">
				<el-option v-for="item in floorData" :key="item.floorNum" :label="'第' + item.floorNum +'层'" :value="item.floorNum" />
			</el-select>
			<el-input
				class="company-search"
				placeholder="请输入企业名称，进行检索"
				v-model="inputValue"
				clearable>
			</el-input>
			<el-button class="bt-request" :loading="loading" type="primary" icon="el-icon-search" @click="searchCompany">查询全部</el-button>
		</div>
		<el-table
			:data="filterDataList" height="835" border 	style="width: 100%"
			@row-dblclick="handleDoubleClick"
			>
			<el-table-column type="expand" style="width: 100%">
				<template slot-scope="props">
					<el-form label-position="left" inline class="table-expand">
						<!-- <el-form-item label="街道">
							<span>{{ props.row.streetName }}</span>
						</el-form-item> -->
						<el-form-item label="楼宇名称">
							<span>{{ props.row.buildingName }}</span>
						</el-form-item>

						<el-form-item label="楼层">
							<span>{{ props.row.floorNum }}</span>
						</el-form-item>
						<el-form-item label="租赁/购买">
							<span>{{ props.row.officeSpaceType }}</span>
						</el-form-item>
						<el-form-item label="员工">
							<span>{{ props.row.employeesNum }}</span>
						</el-form-item>
						<el-form-item label="本科及以上">
							<span>{{ props.row.bachelorAboveNum }}</span>
						</el-form-item>


						<el-form-item label="是否独立法人企业">
							<span>{{ props.row.legalRepresentative }}</span>
						</el-form-item>
						<el-form-item label="2020营收（万元）">
							<span>{{ props.row.companyTax[2].revenue }}</span>
						</el-form-item>
						<el-form-item label="2020税收（万元）">
							<span>{{ props.row.companyTax[2].tax }}</span>
						</el-form-item>

						
						<el-form-item label="税收所在地">
							<span>{{ props.row.companyTax[2].taxAdress }}</span>
						</el-form-item>
						<el-form-item label="行业名称">
							<span>{{ props.row.industryName }}</span>
						</el-form-item>
						<el-form-item label="企业类型">
							<span>{{ props.row.enterpriseType }}</span>
						</el-form-item>
						<!-- <el-form-item label="企业背景">
							<span>{{ props.row.enterpriseBackground }}</span>
						</el-form-item> -->
						<el-form-item label="注册时间">
							<span>{{ props.row.registeredTime }}</span>
						</el-form-item>
						<el-form-item label="企业主营方向" >
							<span>{{ props.row.mainProducts }}</span>
						</el-form-item>
					</el-form>
				</template>
    	</el-table-column>
				<el-table-column 	type="index"	width="80" label="ID">
			</el-table-column>
			<el-table-column prop="companyName" label="企业名称" width="180">
			</el-table-column>
			<el-table-column prop="unifiedSocialCreditCode" label="统一社会信用代码" width="180">
			</el-table-column>
			<el-table-column prop="buildingName" label="楼宇名称" width="140">
			</el-table-column>
			<el-table-column prop="actualOfficeAddress" label="实际办公地址" width="180">
			</el-table-column>
			<el-table-column prop="registeredCapital" label="注册资本(万元)" width="100">
			</el-table-column>
			<el-table-column prop="legalRepresentative" label="公司法人代表" width="140">
			</el-table-column>
			<el-table-column prop="contacts" label="联系人" width="120">
			</el-table-column>
			<el-table-column prop="phone" label="联系电话" width="120">
			</el-table-column>
			<el-table-column prop="area" label="租赁/购买面积" width="100">
			</el-table-column>
			<el-table-column prop="registeredAddress" label="工商注册登记地" width="180">
			</el-table-column>
			<el-table-column prop="workRoomName" label="所属房间" width="120">
			</el-table-column>
			<el-table-column prop="companyRoom[0].name" label="定位房间" width="100">
			</el-table-column>
			<el-table-column prop="floorNum" label="楼层" width="100">
			</el-table-column>
	
		</el-table>
		 <!-- 分页显示 -->
	<pagination :total-num="total" :page.sync="paginationSetting.curPage" :limit.sync="paginationSetting.limit" ></pagination>
	</div>
</template>

<script>
import { getCompanyBySearch, getBuildings, getBuildingFloors, getCompanysByBuilding, getInfoByBuildingNameAndFloor } from '@/api/company.js';
import { flatCompanyInfo } from '@/utils/tools.js'
import { deepClone } from '@/utils/tools.js';
import pagination from '../../../components/pagination.vue'

export default {
	name: 'CompanyInfo',
	data() {
		return {
			buildingEconomyData: [],
			inputValue: '',
			filterData: [],
			tempfilterData: [],
			buildingsData: [],
			floorData:[],
			loading: false,
			value: '',
			lvalue: '',
			filterInfo: {
				currentBuildingName:'',
				currentFloorNum: '',
			},
			paginationSetting: {
				limit: 200,
				curPage: 1
			},
			selectedBuildingId: -1
		}
	},
	components: {
		pagination
	},
	mounted (){
		this.getBuildingInfo();
	},
	computed:{
		total(){
			return this.filterData.length;
		},
		filterDataList(){
			return this.filterData.filter((item, index) => {
				return index >= (this.paginationSetting.curPage - 1) * this.paginationSetting.limit && index < this.paginationSetting.curPage * this.paginationSetting.limit;
			})
		},
		customizeIndex(){
			return (this.paginationSetting.curPage - 1) * this.paginationSetting.limit + 1;
		}
	},
	methods: {
		getComBysearch(){
                getCompanyBySearch(this.inputValue).then(res =>{
					this.filterData = flatCompanyInfo(res);
				})
		},
		searchCompany (){
			//检索指定公司信息
			if(this.filterData.length > 0){
				 this.filterData = [];
				 this.buildingEconomyData.forEach((item) => {
					if(!!~item.companyName.indexOf(this.inputValue)){
							this.filterData.push(item);
					} 
				})
				this.$message({
					message: '查询完毕',
					type: 'success'
				}); 
			}else{
				this.getComBysearch();
				this.$message({
					message: '查询完毕',
					type: 'success'
				});
			}
		},
		getBuildingInfo() {
			//get请求已建的buildings数据
			getBuildings().then(res => {
				this.buildingsData = res;
			})
		},
		selectBuilding (curValue){
			//根据选择的楼栋名，请求入驻该楼栋的所有公司信息
			let singleBuildingData = this.buildingsData.find(item =>{
				return item.buildingName === curValue;
			});
			this.selectedBuildingId = singleBuildingData.id;
			getCompanysByBuilding(this.selectedBuildingId).then(res => {
				this.buildingEconomyData = flatCompanyInfo(res);
				this.filterData = this.buildingEconomyData;
				console.log(this.filterData);
				//this.filterData = flatCompanyInfo(res);
				this.tempfilterData = deepClone(this.filterData, []);//返回一个深度克隆的副本
			}).catch(err => {
					this.$message({
					message: '请求数据失败',
					type: 'warning'
				    });
			});
			if(!curValue){
				this.floorData = [];
				return
			}else{
                this.getBuildingFloordata(curValue);
			}          
		},

		getBuildingFloordata(curValue){
			getBuildingFloors(curValue).then(res =>{
				this.floorData = res;
				var hash = {};
				this.floorData = this.floorData.reduce(function(item, next) {
					hash[next.floorNum] ? '' : hash[next.floorNum] = true && item.push(next);
					return item
				}, [])
				console.log(this.floorData);
			}).catch(err =>{
					this.$message({
					message: '请求数据失败楼层',
					type: 'warning'
					});
			});		
		},

		floorNumSelected(item){
		
			this.fliterOptionsChanged();
		},
		handleBuildingSelectClear(){
		
			this.value = '';
			this.lvalue = '';
			this.floorData = [];
			this.fliterOptionsChanged();
		},
		handleFloorNumSelectClear(){
			this.fliterOptionsChanged();
		},
		fliterOptionsChanged(){
			
			this.filterInfo.currentBuildingName = this.value;
			this.filterInfo.currentFloorNum = this.lvalue;			
			if(this.filterInfo.currentBuildingName == undefined){
				this.filterInfo.currentBuildingName= '';
			}
			this.filterCompanyInfo(this.filterInfo);
		},
				//根据条件（楼栋、房间）过滤人房数据
		filterCompanyInfo(dataInfo){
	
			if(dataInfo.currentBuildingName !== '' && dataInfo.currentFloorNum !== ''){
				this.filterData = this.tempfilterData.filter((item) => {
					return item.buildingName === dataInfo.currentBuildingName && item.floorNum === dataInfo.currentFloorNum ;
				})
			}else if(dataInfo.currentFloorNum === '' && dataInfo.currentBuildingName !== ''){
				this.filterData = this.tempfilterData.filter((item) => {
					return  item.buildingName === dataInfo.currentBuildingName;
				})
			}else {
				this.filterData = this.tempfilterData;
			}
			this.resetPaginationSetting();
		},
		resetPaginationSetting(){
			this.paginationSetting = {
				limit: 200,
				curPage: 1
			}
		},

		handleDoubleClick(row, column, event){
			this.$router.push({name: 'buildingEcoMap'});
            this.handleDelivery(row);
		},
		handleDelivery(row){
			getInfoByBuildingNameAndFloor(row.buildingName, row.companyRoom[0].name).then( (res) => {	
				this.bus.$emit('deliveryPositionInfo', res[0], row.companyRoom[0].name)
			})
		}
	}
}
</script>

<style scoped>
 .toolbar {
	 margin: 5px;
 }

 .bt-request{
	 display: inline-block;
 }
 .company-search{
	 max-width: 220px;
	 margin-left: 10px;
 }

 .table-expand {
    font-size: 0;
  }
  .table-expand >>> label {
    width: 140px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }

  .table-expand .el-form-item:last-child {
		width: 100%;
	}

	.table-expand .el-form-item:last-child >>> label{
		position: absolute;
	}

	.table-expand .el-form-item:last-child >>> div{
		margin-left: 140px;
	}
 
</style>
