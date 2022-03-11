<template>
    		 <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import { GetIndustryRevenueTop ,GetIndustryTaxTop} from '@/api/company.js';
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
const animationDuration = 2000


export default {
  name: 'BottomCharts',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '1380px'
    },
    height: {
      type: String,
      default: '330px'
    },
  },
  components: {
    
  },
  data () {
    return {
      seriesData1:[],
      seriesData2:[],
      seriesData3:[],
    }
  },
   created(){
     this.getIndustryRevenueTop();
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
    seriesData1: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
    seriesData2: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },  
     seriesData3: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },



  methods: {
    async getIndustryRevenueTop(){
      for(var i = 3;i <= 18;i++){
        if(i != 16 && i != 17){
          await  GetIndustryRevenueTop(i).then(res =>{
               const RevenueTop = JSON.parse(JSON.stringify(res).replace(/companyname/g, 'name').replace(/revenue/g, 'value').replace(/有限/g, '').replace(/公司/g, '').replace(/湖北省/g, '').replace(/湖北/g, '').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
               this.seriesData1.push(RevenueTop[0] ? RevenueTop[0] : {})
               this.seriesData2.push(RevenueTop[1] ? RevenueTop[1] : {})
               this.seriesData3.push(RevenueTop[2] ? RevenueTop[2] : {})
            })
        }
      }
       
    },
    setOptions() {
      var option = {
          toolbox: {
              show : true,
              orient: 'vertical',
              x: 'right',
              y: 'center',
              feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                  restore : {show: true},
                  saveAsImage : {show: true}
              }
          },
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
        grid: {
          
          left: 10,
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
          legend: {
              data:['第1','第2','第3'],
              textStyle:{
                 color:'auto'
              },
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : ['制造业','电燃气水','建筑业','运输仓储','计算机信息', '批发零售', '住宿餐饮', '金融业', '房地产业', '租赁商务业', "科研地勘",
                "水利公共管理", "服务业", "文娱体育业"],
                  axisTick: { alignWithLabel: true},
                  axisLabel:{ interval:0 }
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'第1',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 12,
                    textStyle: {
                        color: '#FFFFFF'
                    },
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData1,
              },
              {
                  name:'第2',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 12,
                    textStyle: {
                        color: '#FFFFFF'
                    },
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData2,
              },
              {
                  name:'第3',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 12,
                    textStyle: {
                        color: '#FFFFFF'
                    },
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData3,
              },
          ]
      };               
      this.chart.setOption(option);
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions();
    }
  }
}
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
.charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;

  .bc-chart-item {
    width: 25%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .bcci-header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }

  .dv-active-ring-chart {
    height: calc(~"100% - 80px");
  }

  .label-tag {
    height: 30px;
  }

  .active-ring-name {
    font-size: 18px !important;
  }

  .decoration-1, .decoration-2, .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>
