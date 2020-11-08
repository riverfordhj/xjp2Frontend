<template>
	<div id="output" />
</template>

<script>
const $ = require('jquery');

export default {
	name: 'pivotTablePanel',
	props: ['statisticalData'],
	data(){
		return {
			renderers: null,
			statistics: this.statisticalData
		}
	},
	watch:{
		statisticalData: function(){
			this.setPivot();
		}
	},
	mounted(){
		this.renderers = $.extend($.pivotUtilities.renderers,$.pivotUtilities.c3_renderers)
	},
	methods:{
		setPivot() {
			const self = this;
			$('#output').pivotUI(
				this.statisticalData,
				{
					renderers: self.renderers
				}
			);
		}
	}

}
</script>

<style>
 #output{
	 /* margin: 20px;
	 padding: 10px; */
	 border: 1px solid black;
 }
</style>