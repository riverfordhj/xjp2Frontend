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
		</div>
		<el-table
			:data="filterData" height="920" border	style="width: 100%">
			<el-table-column type="expand" style="width: 100%">
      <template slot-scope="props">
        <el-form label-position="left" inline class="table-expand">
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
			<el-table-column prop="actualOfficeAddress" label="实际办公地址" width="180">
			</el-table-column>
			<el-table-column prop="registeredCapital" label="注册资本(万元)" width="180">
			</el-table-column>
			<el-table-column prop="isIndependentLegalEntity" label="是否独立法人企业" width="180">
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
			companyData: [],
			inputValue: '',
			filterData: [],
			loading: false
		}
	},
	methods: {
		handleCompanyInfo () {
			this.loading = true;
			getCompanyInfo().then(res => {
				this.companyData = res;
				this.filterData = res;
				this.loading = false;
			}).catch(err => {
				console.log(err);
				this.loading = false;
			});
		},
		searchCompany (value){
			if(this.companyData.length === 0){
				this.$message({
					message: '请先进行查询操作',
					type: 'warning'
				});
			}
			this.filterData = [];
			this.companyData.forEach((item) => {
				if(!!~item.companyName.indexOf(value)){
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
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }

 
</style>
