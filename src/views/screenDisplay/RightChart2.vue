<template>
    		 <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import { getRevenueRound ,getTaxRound} from '@/api/company.js';
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
const animationDuration = 2000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '460px'
    },
    height: {
      type: String,
      default: '205px'
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
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   window.removeEventListener('resize', this.__resizeHandler)
  //   this.chart.dispose()
  //   this.chart = null
  // },

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
					text: '徐家棚营收分布图'
				},
        series: [{
          type: 'pie',
          data: this.revenueRoundData ,
					insideLabel: {
					 show: true
				  }
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

