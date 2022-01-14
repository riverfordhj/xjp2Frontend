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
      default: '360px'
    },
  },
  components: {
    
  },
  data () {
    return {
      seriesData1:[],
      seriesData2:[],
      seriesData3:[],
      seriesData4:[],
      seriesData5:[],
      seriesData6:[],
      seriesData7:[],
      seriesData8:[],
      seriesData9:[],
      seriesData10:[],
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
    seriesData4: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
    seriesData5: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },  
     seriesData6: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
    seriesData7: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
    seriesData8: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },  
     seriesData9: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
     seriesData10: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },



  methods: {
    async getIndustryRevenueTop(){
      for(var i = 1;i <= 18;i++){
        if( i != 2){
          await  GetIndustryRevenueTop(i).then(res =>{
              debugger
               const RevenueTop = JSON.parse(JSON.stringify(res).replace(/companyname/g, 'name').replace(/revenue/g, 'value'));
               this.seriesData1.push(RevenueTop[0] ? RevenueTop[0] : {})
               this.seriesData2.push(RevenueTop[1] ? RevenueTop[1] : {})
               this.seriesData3.push(RevenueTop[2] ? RevenueTop[2] : {})
               this.seriesData4.push(RevenueTop[3] ? RevenueTop[3] : {})
               this.seriesData5.push(RevenueTop[4] ? RevenueTop[4] : {})
               this.seriesData6.push(RevenueTop[5] ? RevenueTop[5] : {})
               this.seriesData7.push(RevenueTop[6] ? RevenueTop[6] : {})
               this.seriesData8.push(RevenueTop[7] ? RevenueTop[7] : {})
               this.seriesData9.push(RevenueTop[8] ? RevenueTop[8] : {})
               this.seriesData10.push(RevenueTop[9] ? RevenueTop[9] : {})
            })
        }
      }
      console.log(this.seriesData1);
       
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
              data:['第1','第2','第3','第4', '第5', '第6', '第7', '第8', '第9', "第10"],
              textStyle:{
                 color:'auto'
              },
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  data : ['农林牧渔','制造业','电燃气水','建筑业','运输仓储','计算机信息', '批发零售', '住宿餐饮', '金融业', '房地产业', '租赁商务业', "科研地勘",
                "水利公共管理", "服务业", "教育", "卫生社会保障业", "文娱体育业"],
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
                    fontSize: 6,
                    // textStyle: {
                    //     color: '#333'
                    // },
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
                    fontSize: 6,
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
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData3,
              },
                            {
                  name:'第4',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData4,
              },
                            {
                  name:'第5',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData5,
              },
                            {
                  name:'第6',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData6,
              },
                            {
                  name:'第7',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData7,
              },
                            {
                  name:'第8',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData8,
              },
                            {
                  name:'第9',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData9,
              },
                            {
                  name:'第10',
                  type:'bar',
                  label: {
                    show: true,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    fontSize: 6,
                      formatter:function(params){
                      return params.name;
                      },
                   },
                  data:this.seriesData10,
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
