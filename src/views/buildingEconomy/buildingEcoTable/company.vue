<template>
	<div class="container">
	  <div class="toolbar">
			<el-input
				class="company-search"
				placeholder="请输入企业名称，进行检索"
				v-model="inputValue"
				clearable
				@change="searchCompany">
			</el-input>
			<el-select v-model="value" placeholder="请选择楼栋" clearable @change="selectBuilding">
				<el-option
					v-for="item in buildingsData"
					:key="item.id"
					:value="item.buildingName">
				</el-option>
 		 	</el-select>
			<el-button class="bt-request" :loading="loading" type="primary" icon="el-icon-search" @click="handleCompanyInfo">查询全部</el-button>
		</div>
		<el-table
			:data="filterData" height="920" border 	style="width: 100%"
			@row-dblclick="handleDoubleClick"
			>
			<el-table-column type="expand" style="width: 100%">
				<template slot-scope="props">
					<el-form label-position="left" inline class="table-expand">
						<el-form-item label="街道">
							<span>{{ props.row.streetName }}</span>
						</el-form-item>
						<el-form-item label="楼宇名称">
							<span>{{ props.row.buildingName }}</span>
						</el-form-item>

						<el-form-item label="楼层">
							<span>{{ props.row.floor }}</span>
						</el-form-item>
						<el-form-item label="租赁/购买">
							<span>{{ props.row.category }}</span>
						</el-form-item>
						<el-form-item label="入驻时间">
							<span>{{ props.row.settlingTime }}</span>
						</el-form-item>
						<el-form-item label="搬离时间">
							<span>{{ props.row.moveAwayTime }}</span>
						</el-form-item>

						<el-form-item label="是否独立法人企业">
							<span>{{ props.row.legalRepresentative }}</span>
						</el-form-item>

						<el-form-item label="企业税收额（万元）">
							<span>{{ props.row.corporateTax }}</span>
						</el-form-item>
						<el-form-item label="缴税时长">
							<span>{{ props.row.duration }}</span>
						</el-form-item>
						
						<el-form-item label="企业名称">
							<span>{{ props.row.companyName }}</span>
						</el-form-item>
						<el-form-item label="注册地址">
							<span>{{ props.row.registrationPlace }}</span>
						</el-form-item>
						<el-form-item label="企业类型">
							<span>{{ props.row.enterpriseType }}</span>
						</el-form-item>
						<el-form-item label="企业背景">
							<span>{{ props.row.enterpriseBackground }}</span>
						</el-form-item>
						<el-form-item label="备注">
							<span>{{ props.row.note }}</span>
						</el-form-item>
						<el-form-item label="企业主营方向" >
							<span>{{ props.row.businessDirection }}</span>
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
			<el-table-column prop="buildingName" label="楼宇名称" width="180">
			</el-table-column>
			<el-table-column prop="actualOfficeAddress" label="实际办公地址" width="180">
			</el-table-column>
			<el-table-column prop="registeredCapital" label="注册资本(万元)" width="180">
			</el-table-column>
			<el-table-column prop="legalRepresentative" label="公司法人代表" width="140">
			</el-table-column>
			<el-table-column prop="contacts" label="联系人" width="120">
			</el-table-column>
			<el-table-column prop="phone" label="联系电话" width="120">
			</el-table-column>
			<el-table-column prop="area" label="租赁/购买面积" width="180">
			</el-table-column>
			<el-table-column prop="registeredAddress" label="工商注册登记地" width="180">
			</el-table-column>
			<el-table-column prop="taxStatisticsArea" label="税收统计区" width="120">
			</el-table-column>
	
		</el-table>
	</div>
</template>

<script>
import { getCompanyInfo, getBuindingInfoByStatus, getCompanysByBuilding, getInfoByBuildingNameAndFloor } from '@/api/company.js';
import { flatCompanyInfo } from '@/utils/tools.js'

export default {
	name: 'CompanyInfo',
	data() {
		return {
			buildingEconomyData: [],
			inputValue: '',
			filterData: [],
			buildingsData: [],
			loading: false,
			value: '',

			selectedBuildingId: -1
		}
	},
	mounted (){
		this.getBuildingInfo();
	},
	methods: {
		handleCompanyInfo () {
			this.loading = true;
			getCompanyInfo().then(res => {
				//debugger;
				this.buildingEconomyData = flatCompanyInfo(res);
				this.filterData = this.buildingEconomyData;

				this.loading = false;
			}).catch(err => {
				console.log(err);
				this.loading = false;
			});
		},
		searchCompany (value){
			//检索指定公司信息
			if(this.buildingEconomyData.length === 0){
				this.$message({
					message: '请先进行查询操作',
					type: 'warning'
				});
			}
			this.filterData = [];
			this.buildingEconomyData.forEach((item) => {
				if(!!~item.companyName.indexOf(value)){
					this.filterData.push(item);
				}
			});
		},
		getBuildingInfo() {
			//get请求已建的buildings数据
			getBuindingInfoByStatus().then(res => {
				this.buildingsData = res;
			})
		},
		selectBuilding (curValue){
			//根据选择的楼栋名，请求入驻该楼栋的所有公司信息
			let singleBuildingData = this.buildingsData.find(item =>{
				return item.buildingName === curValue;
			});
			this.selectedBuildingId = singleBuildingData.id;

			getCompanysByBuilding(this.selectedBuildingId ).then(res => {
				this.buildingEconomyData = flatCompanyInfo(res);
				this.filterData = this.buildingEconomyData;
			}).catch(err => {
					this.$message({
					message: '请求数据失败',
					type: 'warning'
				});
			});
		},
		handleDoubleClick(row, column, event){
			this.$router.push({name: 'buildingEcoMap'});
      this.handleDelivery(row);
		},
		handleDelivery(row){
			getInfoByBuildingNameAndFloor(row.buildingName, row.floor).then( (res) => {
				this.bus.$emit('deliveryPositionInfo', res[0], row.floor)
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
