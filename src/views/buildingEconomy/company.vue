<template>
	<div class="container">
	  <div class="toolbar">
			<el-button class="bt-request" :loading="loading" type="primary" icon="el-icon-search" @click="handleCompanyInfo">查询</el-button>
			<el-input
				class="company-search"
				placeholder="请输入企业名称，进行检索"
				v-model="inputValue"
				clearable
				@change="searchCompany">
			</el-input>
			<el-select v-model="value" placeholder="请选择" clearable @change="selectBuilding">
				<el-option
					v-for="item in buildingsData"
					:key="item.id"
					:value="item.name">
				</el-option>
 		 </el-select>
		</div>
		<el-table
			:data="filterData" height="920" border	style="width: 100%">
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
					<el-form-item label="租赁/购买面积">
						<span>{{ props.row.area}}</span>
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
        </el-form>
      </template>
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
			<el-table-column prop="businessDirection" label="企业主营方向" width="220">
			</el-table-column>
			<el-table-column prop="registeredAddress" label="工商注册登记地" width="180">
			</el-table-column>
			<el-table-column prop="taxStatisticsArea" label="税收统计区" width="120">
			</el-table-column>
	
		</el-table>
	</div>
</template>

<script>
import { getCompanyInfo } from '@/api/company.js';

export default {
	name: 'CompanyInfo',
	data() {
		return {
			buildingEconomyData: [],
			inputValue: '',
			filterData: [],
			buildingNames: [],
			buildingsData: [],
			loading: false,
			value: ''
		}
	},
	methods: {
		handleCompanyInfo () {
			var _self = this;
			_self.loading = true;
			getCompanyInfo().then(res => {
				//扁平化数据（数组）的元素对象;提取buildingNames属性
				res.forEach(item =>{
					let row = {};
					for(let o in item){
						let tar = item[o];
						if(typeof tar === 'object' &&  tar != null){
							for(let key in tar){
								row[key] = tar[key]
							}
						}else{
							row[o] = item[o];
							if(o === 'buildingName' && !_self.buildingNames.includes(tar)){
								_self.buildingNames.push(tar);
							}
							
						}
					}
				  _self.buildingEconomyData.push(row)
				})
			
				_self.filterData = _self.buildingEconomyData;
			  _self.buildingNames.forEach( (item, index) => {
					let objItem = {
						id : index,
						name : item 
					}
					_self.buildingsData.push(objItem);
				})
					// debugger;
				_self.loading = false;
			}).catch(err => {
				console.log(err);
				_self.loading = false;
			});
		},
		searchCompany (value){
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
		selectBuilding (curValue){
			if(this.buildingEconomyData.length === 0){
				this.$message({
					message: '请先进行查询操作',
					type: 'warning'
				});
			}
			this.filterData = [];
			this.buildingEconomyData.forEach((item) => {
				if(!!~item.buildingName.indexOf(curValue)){
					this.filterData.push(item);
				}
			});
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

 
</style>
