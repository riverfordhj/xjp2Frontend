<template>
	<div>
		<!-- 组件intervalSelection：向外触发事件selectedInterval、resetStatistics -->
		<interval-selection :form-title="formTitle" :default-interval="defaultInterval" @selectedInterval="useInterval" @resetStatistics="handleResetting"></interval-selection>
		<pivot-table-panel :statistical-data="statisticsArray" :default-settings = "defaultSettingsForPivot"></pivot-table-panel>
	</div>
</template>

<script>

import { getCompanyTaxInfo } from '@/api/company.js'

import intervalSelection from '../components/intervalSelection.vue'
import pivotTablePanel from '@/components/pivotTablePanel.vue'

export default {
	name: 'inqueryBuildingTax',
	data(){
		return {
			companyTaxInfo: [],
			formTitle: '合计查询区间（万元）:',
			defaultInterval: {
				min: 2000,
				max: 10000
			},
			defalutSelectTaxInfo: [],
			statisticsArray: [],
			defaultSettingsForPivot: {
				rows: ['纳税年份'],
				cols: ['纳税人'],
				aggregatorName: '求和',
				vals: ['纳税额合计'],
				rendererName: '柱形图'
			}
			
		}
	},
	components: {
		intervalSelection,
		pivotTablePanel
	},
	mounted(){
		this.getCompanyTaxData();
	},
	methods:{
		getCompanyTaxData(){
			getCompanyTaxInfo().then(res => {
				this.companyTaxInfo = res;
				
				this.useInterval(this.defaultInterval);
			}).catch(
				err => console.log(err)
			)
		},
		//根据指定区间，筛选数据
		useInterval(intervalObj){
			this.statisticsArray = this.companyTaxInfo.filter(item => {
				return item['纳税额合计'] >= intervalObj.min && item['纳税额合计'] <= intervalObj.max;
			});
		},
		//恢复默认统计区间
		handleResetting(){
			this.useInterval(this.defaultInterval);
		}
	
	}

}
</script>

<style>

</style>