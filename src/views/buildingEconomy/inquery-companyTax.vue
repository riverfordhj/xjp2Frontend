<template>
	<div>
		<!-- 组件intervalSelection：向外触发事件selectedInterval、resetStatistics -->
		<interval-selection :form-title="formTitle" @selectedInterval="useInterval" @resetStatistics="handleResetting"></interval-selection>
		<div id="output"></div>
	</div>
</template>

<script>
const $ = require('jquery')
import 'jqueryui/jquery-ui'
// import jquery from 'jquery'
import 'pivottable/dist/pivot.css'
import 'pivottable'
import d3 from 'd3'
import c3 from 'c3'
import {c3_renderers} from '../c3_renderers'

import { getCompanyTaxInfo } from '@/api/company.js'

//引入 intervalSelection 组件
import intervalSelection from './buildingEcoTable/components/intervalSelection.vue'

export default {
	name: 'inqueryBuildingTax',
	data(){
		return {
			companyTaxInfo: [],
			formTitle: '合计查询区间:',
		}
	},
	components: {
		intervalSelection
	},
	created(){
		c3_renderers.call(this, $, c3);
		this.renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.c3_renderers);
		
		this.getCompanyTaxData();

	},
	methods:{
		getCompanyTaxData(){
			getCompanyTaxInfo().then(res => {
				this.companyTaxInfo = res;
				this.setPivot(this.companyTaxInfo);
			}).catch(
				err => console.log(err)
			)
		},
		useInterval(intervalObj){
			this.filterTaxInfo = this.companyTaxInfo.filter(item => {
				return item.totalTax >= intervalObj.min && item.totalTax <= intervalObj.max;
			})
			this.setPivot(this.filterTaxInfo);
		},
		handleResetting(){
			this.setPivot(this.companyTaxInfo);
		},
		setPivot(data) {
      const self = this;
      $('#output').pivotUI(
        data,
        {
          renderers: self.renderers
        }
      )
    }
	
	}

}
</script>

<style>

</style>