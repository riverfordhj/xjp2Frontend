<template>
	<div>
		<!-- 组件intervalSelection：向外触发事件selectedInterval、resetStatistics -->
		<interval-selection :form-title="formTitle" @selectedInterval="useInterval" @resetStatistics="handleResetting"></interval-selection>
		<pivot-table-panel :statistical-data="statisticsArray"></pivot-table-panel>
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
			formTitle: '合计查询区间:',
			statisticsArray: []
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
			}).catch(
				err => console.log(err)
			)
		},
		useInterval(intervalObj){
			this.filterTaxInfo = this.companyTaxInfo.filter(item => {
				return item.totalTax >= intervalObj.min && item.totalTax <= intervalObj.max;
			})
			this.statisticsArray =  this.filterTaxInfo;
		},
		handleResetting(){
			this.statisticsArray = this.companyTaxInfo;
		}
	
	}

}
</script>

<style>

</style>