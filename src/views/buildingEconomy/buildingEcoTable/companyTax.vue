<template>
	<div class="container">

		<interval-selection :form-title="formTitle" :default-interval="defaultInterval" @selectedInterval="useInterval" @resetStatistics="handleResetting"></interval-selection>

		<el-table
			:data="filteredCompanyTaxData" height="860" border 	style="width: 100%">
			<el-table-column type="expand" style="width: 100%">
				<template slot-scope="props">
					<el-form label-position="left" inline class="table-expand">						
						<el-form-item label="城建">
							<span>{{ props.row['城建'] }}</span>
						</el-form-item>
						<el-form-item label="房产">
							<span>{{ props.row['房产'] }}</span>
						</el-form-item>
						<el-form-item label="印花">
							<span>{{ props.row['印花'] }}</span>
						</el-form-item>
						<el-form-item label="土使">
							<span>{{ props.row['土使'] }}</span>
						</el-form-item>
						<el-form-item label="土增">
							<span>{{ props.row['土增'] }}</span>
						</el-form-item>
						<el-form-item label="车船">
							<span>{{ props.row['车船'] }}</span>
						</el-form-item>
						<el-form-item label="契税">
							<span>{{ props.row['契税'] }}</span>
						</el-form-item>
						<el-form-item label="教附">
							<span>{{ props.row['教附'] }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>

			<el-table-column 	type="index"	width="50">
			</el-table-column>
			<el-table-column prop="纳税人" label="纳税人名称" width="180">
			</el-table-column>
			<el-table-column prop="纳税年份" label="纳税年份" width="180">
			</el-table-column>
			<el-table-column prop="纳税额合计" label="合计(万元)" width="180">
			</el-table-column>
			<el-table-column prop="营业税" label="营业税" width="180">
			</el-table-column>
			<el-table-column prop="增值税" label="增值税" width="180">
			</el-table-column>
			<el-table-column prop="企所" label="企所" width="180">
			</el-table-column>
			<el-table-column prop="个所" label="个所" width="180">
			</el-table-column>
			<el-table-column prop="滞纳" label="滞纳(万元)" width="180">
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
			formTitle: '合计查询区间(万元):',
			defaultInterval: {
				min: 400,
				max: 10000
			}
		}
	},
	mounted(){
		this.getCompanyTaxData();
	},
	methods:{
		getCompanyTaxData(){
			getCompanyTaxInfo().then(res => {
				this.companyTaxData = res;
	
				this.useInterval(this.defaultInterval);
			}).catch(
				err => console.log(err)
			)
		},
		//根据指定区间，筛选数据
		useInterval(intervalObj){
			this.filteredCompanyTaxData = this.companyTaxData.filter(item => {
				return item['纳税额合计'] >= intervalObj.min && item['纳税额合计'] <= intervalObj.max; 
			})
		},
		handleResetting(){
			this.useInterval(this.defaultInterval);
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