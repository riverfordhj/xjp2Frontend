<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import { getRevenueRound } from '@/api/company.js';
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
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
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
  },



  methods: {
    getRevenueRoundData(){
        getRevenueRound().then(res =>{
          debugger
					 Object.values(res[0]).map( val =>{
             this.revenueRoundData.push(val);
					 })			 		      
        })
        console.log(this.revenueRoundData)
    },
    setOptions( actualData ) {
      this.chart.setOption({
        title : {
          text: '徐家棚营收分布',
          textStyle:{
              fontSize: 15,
              fontWeight: 'bolder',
          },
          y:'-4px',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['0-50', '50-100', '100-500', '500-1000','1000-5000', '5000以上'],
          axisTick: {
              alignWithLabel: true
            // show:true
          },
          axisLabel:{
             interval:0
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: true
          }
        }],
        series: [{        
          name: '营收分布',
          type: 'bar',
          stack: 'vistors',
          barWidth: '50%',
          data: actualData ,
          animationDuration
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.revenueRoundData);
    }
  }
}
</script>
