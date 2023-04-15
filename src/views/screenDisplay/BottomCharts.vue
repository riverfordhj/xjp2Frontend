<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import { GetIndustryRevenueTop, GetIndustryTaxTop } from '@/api/company.js';
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
  data() {
    return {
      industryrevenue: [],
      seriesData1: [],
      seriesData2: [],
      seriesData3: [],
      seriesData4: [],
      seriesData5: [],
      type: ['批发', '零售', '住宿', '餐饮', '营利性服务业', '非营利性服务业']
    }
  },
  created() {
    this.getIndustryRevenueTop();
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler);
    this.bus.$on('deliveryindustry', (industry, industryname) => {
      // console.log(industry, industryname,'这是传来的产业数据')
      this.type = industryname
      this.industryrevenue = industry
      this.getIndustryRevenueTop();
      this.setOptions();
      this.initChart();
    });
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
    async getIndustryRevenueTop() {
      console.log(this.industryrevenue.length == 0)
      if (this.industryrevenue.length == 0) {
        this.seriesData1 = []
        this.seriesData2 = []
        this.seriesData3 = []
        this.seriesData4 = []
        this.seriesData5 = []

        const res = [
          [{ name: '中煤华中能源有限公司', value: '1759692.9' }, { name: '建发（武汉）有限公司', value: '1159690.5' }, { name: '中铁物贸集团武汉有限公司', value: '488985.4' }, { name: '湖北省粮食有限公司', value: '428412.5' }, { name: '湖北人人大经贸有限公司', value: '138599.8' }],
          [{ name: '武汉友芝友汽车服务有限公司', value: '59732' }, { name: '武汉友芝友谦和汽车贸易有限公司', value: '46017' }, { name: '湖北民生汽车贸易有限公司', value: '37414' }, { name: '武汉伏佳安达电气技术有限公司', value: '7961' }, { name: '湖北省生态农业有限公司', value: '6181' }],
          [{ name: '武汉光明佳源酒店管理有限公司光明万丽酒店', value: '4171' }, { name: '西兰蒂亚（武汉）酒店管理有限公司', value: '877' }, { name: '武汉众志恒达酒店投资管理有限公司', value: '590' }, { name: '武汉时光道酒店管理有限公司', value: '300.4' }, { name: '湖北威吉斯酒店管理有限公司', value: '235' }],
          [{ name: '武汉海巢餐饮管理有限公司', value: '2064.4' }, { name: '武汉盛秦风臻宴酒店有限公司', value: '1874' }, { name: '武汉银台食尚商贸有限公司', value: '1393' }, { name: '武汉匠子餐饮管理有限公司', value: '906' }, { name: '武汉拾味馆餐饮有限公司', value: '653' }],
          [{ name: '武汉微思敦网络技术有限公司', value: '61634.2' }, { name: '武汉中商鹏程销品茂管理有限公司', value: '21785.2' }, { name: '武汉永业赛博能规划勘测有限公司', value: '12659.7' }, { name: '武汉欧亚达商业控股集团有限公司', value: '11480.5' }, { name: '武汉爱迪科技股份有限公司', value: '10914.2' }],
          [{ name: '湖北大学', value: '120279.4' }, { name: '湖北大学附属中学', value: '4573.4' }, { name: '武汉市武昌区三角路小学', value: '2862.2' }, { name: '武汉市武昌区育红小学', value: '2485.6' }, { name: '武汉市武昌区徐家棚街社区卫生服务中心', value: '2156.8' }]
        ]

        for (let i = 0; i < 6; i++) {

          // await  GetIndustryRevenueTop(i).then(res =>{
          // 	console.log(res,'bghjjgyuifgv')
          // 		const RevenueTop = JSON.parse(JSON.stringify(res).replace(/companyname/g, 'name').replace(/湖北/g, '').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
          // 	// console.log(RevenueTop)
          // 		this.seriesData1.push(RevenueTop[0] ? RevenueTop[0] : {})
          // 		// console.log(this.seriesData1)
          // 		this.seriesData2.push(RevenueTop[1] ? RevenueTop[1] : {})
          // 		// console.log(this.seriesData2)
          // 		this.seriesData3.push(RevenueTop[2] ? RevenueTop[2] : {})
          // 		// console.log(this.seriesData3)
          // 		this.seriesData4.push(RevenueTop[3] ? RevenueTop[3] : {})
          // 		this.seriesData5.push(RevenueTop[4] ? RevenueTop[4] : {})
          // 	})

          const RevenueTop = JSON.parse(JSON.stringify(res[i]).replace(/有限/g, '').replace(/公司/g, '').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
          this.seriesData1.push(RevenueTop[0] ? RevenueTop[0] : {})
          // console.log(this.seriesData1)
          this.seriesData2.push(RevenueTop[1] ? RevenueTop[1] : {})
          // console.log(this.seriesData2)
          this.seriesData3.push(RevenueTop[2] ? RevenueTop[2] : {})
          // console.log(this.seriesData3)
          this.seriesData4.push(RevenueTop[3] ? RevenueTop[3] : {})
          this.seriesData5.push(RevenueTop[4] ? RevenueTop[4] : {})
        }
      } else {
        this.seriesData1 = []
        this.seriesData2 = []
        this.seriesData3 = []
        this.seriesData4 = []
        this.seriesData5 = []
        for (let i = 0; i < this.industryrevenue.length; i++) {
          // console.log(this.industryrevenue[i])
          const RevenueTop = JSON.parse(JSON.stringify(this.industryrevenue[i]).replace(/有限/g, '').replace(/公司/g, '').replace(/（）/g, ''))
          // console.log(RevenueTop)
          this.seriesData1.push(RevenueTop[0] ? RevenueTop[0] : {})
          // console.log(this.seriesData1)
          this.seriesData2.push(RevenueTop[1] ? RevenueTop[1] : {})
          // console.log(this.seriesData2)
          this.seriesData3.push(RevenueTop[2] ? RevenueTop[2] : {})
          // console.log(this.seriesData3)
          this.seriesData4.push(RevenueTop[3] ? RevenueTop[3] : {})
          this.seriesData5.push(RevenueTop[4] ? RevenueTop[4] : {})
        }
      }
    },
    setOptions() {
      var option = {
        toolbox: {
          show: true,
          orient: 'vertical',
          x: 'right',
          y: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {

          left: 10,
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['第1', '第2', '第3', '第4', '第5'],
          top: '8%',
          textStyle: {
            color: 'auto'
          },
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.type,
            axisTick: { alignWithLabel: true },
            axisLabel: { interval: 0 }
          }
        ],
        yAxis: [
          {
            name: '万',
            type: 'value'
          }
        ],
        series: [
          {
            name: '第1',
            type: 'bar',
            label: {
              show: true,
              position: 'insideBottom',
              distance: 100,
              align: 'left',
              verticalAlign: 'middle',
              rotate: -20,
              fontSize: 12,
              textStyle: {
                color: '#FFFFFF'
              },
              formatter: function (params) {
                return params.name.replace(/\([^\)]*\)/g, "").split('').join('\n');
              },
            },
            data: this.seriesData1,
          },
          {
            name: '第2',
            type: 'bar',
            label: {
              show: true,
              position: 'insideBottom',
              distance: 100,
              align: 'left',
              verticalAlign: 'middle',
              rotate: -20,
              fontSize: 12,
              textStyle: {
                color: '#FFFFFF'
              },
              formatter: function (params) {
                return params.name.split('').join('\n');
              },
            },
            data: this.seriesData2,
          },
          {
            name: '第3',
            type: 'bar',
            label: {
              show: true,
              position: 'insideBottom',
              distance: 100,
              align: 'left',
              verticalAlign: 'middle',
              rotate: -20,
              fontSize: 12,
              textStyle: {
                color: '#FFFFFF'
              },
              formatter: function (params) {
                return params.name.split('').join('\n');
              },
            },
            data: this.seriesData3,
          },
          {
            name: '第4',
            type: 'bar',
            label: {
              show: true,
              position: 'insideBottom',
              distance: 100,
              align: 'left',
              verticalAlign: 'middle',
              rotate: -20,
              fontSize: 12,
              textStyle: {
                color: '#FFFFFF'
              },
              formatter: function (params) {
                return params.name.split('').join('\n');
              },
            },
            data: this.seriesData4,
          },
          {
            name: '第5',
            type: 'bar',
            label: {
              show: true,
              position: 'insideBottom',
              distance: 100,
              align: 'left',
              verticalAlign: 'middle',
              rotate: -20,
              fontSize: 12,
              textStyle: {
                color: '#FFFFFF'
              },
              formatter: function (params) {
                return params.name.split('').join('\n');
              },
            },
            data: this.seriesData5,
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
html,
body {
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

  .decoration-1,
  .decoration-2,
  .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
</style>
