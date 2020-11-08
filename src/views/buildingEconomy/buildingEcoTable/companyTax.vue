<template>
	<div class="container">

		<interval-selection :form-title="formTitle" @selectedInterval="useInterval" @resetStatistics="handleResetting"></interval-selection>

		<el-table
			:data="filteredCompanyTaxData" height="860" border 	style="width: 100%">
			<el-table-column type="expand" style="width: 100%">
				<template slot-scope="props">
					<el-form label-position="left" inline class="table-expand">
						<el-form-item label="营业税">
							<span>{{ props.row.businessTax }}</span>
						</el-form-item>
						<el-form-item label="增值税">
							<span>{{ props.row.valueAddedTax }}</span>
						</el-form-item>
						<el-form-item label="企所">
							<span>{{ props.row.corporateIncomeTax }}</span>
						</el-form-item>
						<el-form-item label="个所">
							<span>{{ props.row.individualIncomeTax }}</span>
						</el-form-item>
						<el-form-item label="城建">
							<span>{{ props.row.urbanConstructionTax }}</span>
						</el-form-item>
						<el-form-item label="房产">
							<span>{{ props.row.realEstateTax }}</span>
						</el-form-item>
						<el-form-item label="印花">
							<span>{{ props.row.stampDuty }}</span>
						</el-form-item>
						<el-form-item label="土使">
							<span>{{ props.row.landUseTax }}</span>
						</el-form-item>
						<el-form-item label="土增">
							<span>{{ props.row.landValueIncrementTax }}</span>
						</el-form-item>
						<el-form-item label="车船">
							<span>{{ props.row.vehicleAndVesselTax }}</span>
						</el-form-item>
						<el-form-item label="契税">
							<span>{{ props.row.deedTax }}</span>
						</el-form-item>
						<el-form-item label="教附">
							<span>{{ props.row.additionalTaxOfEducation }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>

			<el-table-column prop="id" label="序号" width="80">
			</el-table-column>
			<el-table-column prop="unifiedSocialCreditCode" label="统一社会信用代码" width="180">
			</el-table-column>
			<el-table-column prop="taxPayer" label="纳税人名称" width="180">
			</el-table-column>
			<el-table-column prop="taxYear" label="纳税年份" width="180">
			</el-table-column>
			<el-table-column prop="totalTax" label="合计(万元)" width="180">
			</el-table-column>
			<el-table-column prop="delayedTaxPayment" label="滞纳(万元)" width="180">
			</el-table-column>
			<el-table-column prop="registeredAddress" label="注册地址" width="180">
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { getCompanyTaxInfo } from '@/api/company.js';

import intervalSelection from '../components/intervalSelection.vue'

export default {
	name: 'companyTax',
	components: {
		intervalSelection
	},
	data(){
		return {
			companyTaxData:[],
			filteredCompanyTaxData:[],
			formTitle: '合计查询区间:',
		}
	},
	mounted(){
		this.getCompanyTaxData();
	},
	methods:{
		getCompanyTaxData(){
			getCompanyTaxInfo().then(res => {
				this.companyTaxData = res;
				this.filteredCompanyTaxData = res.slice(0, 20);
			}).catch(
				err => console.log(err)
			)
		},
		useInterval(intervalObj){
			this.filteredCompanyTaxData = this.companyTaxData.filter(item => {
					return item.totalTax >= intervalObj.min && item.totalTax <= intervalObj.max; 
			})
		},
		handleResetting(){
			this.filteredCompanyTaxData = this.companyTaxData.slice(0, 20);
		}
	}
}
</script>

<style scoped>
	.toolbar {
		margin: 8px 5px 0;
	}
	.form-container{
		display: flex;
		align-items: center;
	}
	.title {
		margin: 0;
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