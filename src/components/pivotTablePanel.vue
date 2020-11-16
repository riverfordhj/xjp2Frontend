<template>
	<div id="output" />
</template>

<script>
const $ = require('jquery');
import 'jqueryui/jquery-ui'
import 'pivottable/dist/pivot.css'
import 'pivottable'
import 'pivottable/dist/c3_renderers'
import 'pivottable/dist/pivot.zh.js'

export default {
	name: 'pivotTablePanel',
	props: ['statisticalData', 'defaultSettings'],
	data(){
		return {
			// renderers: null,
			statistics: this.statisticalData
		}
	},
	watch:{
		statisticalData: function(){
			this.setPivot();
		}
	},
	mounted(){
		debugger;
		// this.renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers)
	},
	methods:{
		setPivot() {
			const self = this;
			$('#output').pivotUI(
				this.statisticalData,
				this.defaultSettings,
				// {
				// 	// renderers: self.renderers,
				// 	...this.defaultSettings
				// },
				false,
				'zh'
			
			);
		}
	}

}
</script>

<style>
 #output{
	 /* margin: 20px; */
	 padding: 5px;
	 /* border: 1px solid black; */
 }
</style>