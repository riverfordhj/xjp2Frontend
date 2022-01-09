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
    // revenueRound: {
    //   type: Array,
    //   default: function() {
    //     return []
    //   },
    // }
  },
  data() {
    return {
      chart: null,
      revenueRoundData:[],
      taxRoundData:[],
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
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },

  watch: {
    revenueRoundData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
     taxRoundData: {
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
        getTaxRound().then(res =>{       
					 Object.values(res[0]).map( val =>{
             this.taxRoundData.push(val);
					 })			 		      
        });
    },
    setOptions() {
      var option =  {
        // title : {
        //   text: '徐家棚营收分布',
        //   textStyle:{
        //       fontSize: 15,
        //       fontWeight: 'bolder',
        //   },
        //   y:'-4px',
        // },
        // legend: {
        //   data:['营收分布','税收分布'],
        //   textStyle:{color: '#3f3'},
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: 10,
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
            {
            type: 'category',
            data: this.xRevenue,
            axisTick: { alignWithLabel: true},
            axisLabel:{ interval:0 }
            }
        ],
        yAxis: [{
          type: 'value',
          axisTick: {show: true}
        }],
        series: [{        
          name: '营收分布',
          type: 'bar',
          // stack: 'vistors',
           barWidth: '40%',
          data: this.revenueRoundData ,
          // animationDuration
          itemStyle : { normal: {label : {show: true, position: 'inside'}}},
        },
        ]
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

