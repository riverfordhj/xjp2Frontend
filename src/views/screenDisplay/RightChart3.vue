<template>
    		 <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import { getTaxRound } from '@/api/company.js';
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '400px'
    },
    height: {
      type: String,
      default: '330px'
    },
  },
  data() {
    return {
      chart: null,
      taxRoundData:[],
      xTax:['0-30', '30-50', '50-100', '100-300', '300-500', '500-1000', '1000以上'],
    }
  },
  //updated mounted
  created(){
     this.getTaxRoundData();
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },

  watch: {
     taxRoundData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },



  methods: {
    getTaxRoundData(){
        getTaxRound().then(res =>{       
					 Object.values(res[0]).map( val =>{
             this.taxRoundData.push(val);
					 })			 		      
        });
    },
    setOptions() {
      var option =  {
				title: {
					text: '徐家棚税收分布图',
					left: 'center'
				},
				tooltip: {
					trigger: 'item'
				},
				color : ['#91cc75', '#fac858', '#73c0de', 
				'#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
				legend: {
					orient: 'horizontal',
					top:'22px',
					textStyle:{
						color:"#ffffff"
					}
				},
        series: [{
          type: 'pie',
					radius: '65%',
          data: [
						{ name: this.xTax[0], value: this.taxRoundData[0]},
						{ name: this.xTax[1], value: this.taxRoundData[1]},
						{ name: this.xTax[2], value: this.taxRoundData[2]},
						{ name: this.xTax[3], value: this.taxRoundData[3]},
						{ name: this.xTax[4], value: this.taxRoundData[4]},
						{ name: this.xTax[5], value: this.taxRoundData[5]},
						{ name: this.xTax[6], value: this.taxRoundData[6]},
					],
					label:{
						show:false
					},
        },
        ],
      }
      this.chart.setOption(option);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions();
    }
  }
}
</script>

