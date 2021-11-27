<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
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
      default: '600px'
    },
    height: {
      type: String,
      default: '300px'
    },
    taxRound: {
      type: Array,
      default: function() {
        return []
      },
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  //updated mounted
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
    taxRound: {
      deep: true,
      handler(val) {
        this.setOptions(val);
        console.log(12,val)
      },
    },
  },



  methods: {
        setOptions( actualData ) {
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              top: 10,
              left: '2%',
              right: '2%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: ['0-30', '30-50', '50-100', '100-300', '300-500', '500-1000', '1000以上'],
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value',
              axisTick: {
                show: false
              }
            }],
            series: [{        
              name: '税收分布',
              type: 'bar',
              stack: 'vistors',
              barWidth: '60%',
              data: actualData ,
              animationDuration
            }]
          })
        },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.taxRound);
    }
  }
}
</script>