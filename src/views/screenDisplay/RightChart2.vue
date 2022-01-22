<template>
    		 <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import { getRevenueRound } from '@/api/company.js';
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
			revenueRoundData:[],
      xRevenue:['0-50', '50-100', '100-500', '500-1000','1000-5000', '5000以上'],
    }
  },
  //updated mounted
  created(){
     this.getRevenueRoundData();
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

  watch: {
    revenueRoundData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },



  methods: {
    getRevenueRoundData(){
        getRevenueRound().then(res =>{         
					 Object.values(res[0]).map( val =>{
             this.revenueRoundData.push(val);
					 })			 		      
        });
    },
    setOptions() {
      var option =  {
				title: {
					text: '徐家棚营收分布图',
					left: 'center'
				},
				tooltip: {
					trigger: 'item',
				},
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
          data:[
						{ name: this.xRevenue[0], value:this.revenueRoundData[0]},
						{ name: this.xRevenue[1], value:this.revenueRoundData[1]},
						{ name: this.xRevenue[2], value:this.revenueRoundData[2]},
						{ name: this.xRevenue[3], value:this.revenueRoundData[3]},
						{ name: this.xRevenue[4], value:this.revenueRoundData[4]},
						{ name: this.xRevenue[5], value:this.revenueRoundData[5]}
					],
					label:{
						show:false,
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

