<template>
  <div
    ref="chart"
    class="chart"
  />
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  data() {
    return {

    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      var xData = (function() {
        var data = []
        for (var i = 2; i < 13; i++) {
          data.push(i + '月份')
        }
        return data
      }())

      var option = {
        backgroundColor: '#344b58',
        'title': {
          'text': '徐家棚街2018年固定资产投资完成情况',
          // 'subtext': 'BY Wang Dingding',
          x: '4%',

          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'

          }
        },
        'tooltip': {
          'trigger': 'axis',
          'axisPointer': {
            'type': 'shadow',
            textStyle: {
              color: '#fff'
            }

          }
        },
        'grid': {
          'borderWidth': 0,
          'top': 110,
          'bottom': 95,
          textStyle: {
            color: '#fff'
          }
        },
        'legend': {
          x: '4%',
          top: '5%',
          textStyle: {
            color: '#90979c'
          },
          'data': ['小计', '房地产项目', '平均']
        },

        'calculable': true,
        'xAxis': [{
          'type': 'category',
          'axisLine': {
            lineStyle: {
              color: '#90979c'
            }
          },
          'splitLine': {
            'show': false
          },
          'axisTick': {
            'show': false
          },
          'splitArea': {
            'show': false
          },
          'axisLabel': {
            'interval': 0

          },
          'data': xData
        }],
        'yAxis': [{
          'type': 'value',
          'splitLine': {
            'show': false
          },
          'axisLine': {
            lineStyle: {
              color: '#90979c'
            }
          },
          'axisTick': {
            'show': false
          },
          'axisLabel': {
            'interval': 0,
            'formatter': '{value}万元'
          },
          'splitArea': {
            'show': false
          }

        }],
        'dataZoom': [{
          'show': true,
          'height': 30,
          'xAxisIndex': [
            0
          ],
          bottom: 30,
          'start': 0,
          'end': 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          'type': 'inside',
          'show': true,
          'height': 15,
          'start': 1,
          'end': 35
        }],
        'series': [{
          'name': '小计',
          'type': 'bar',
          'stack': '总量',
          'barMaxWidth': 35,
          'barGap': '10%',
          'itemStyle': {
            'normal': {
              'color': 'rgba(255,144,128,1)',
              'label': {
                'show': true,
                'textStyle': {
                  'color': '#fff'
                },
                'position': 'insideTop',
                formatter: function(p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            },
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          'data': [
            // 4078,
            10400,
            19931,
            19466,
            23969,
            41225,
            8164,
            18497,
            17006,
            12691,
            21535,
            17097

          ]
        },

        {
          'name': '房地产项目',
          'type': 'bar',
          'stack': '总量',
          'itemStyle': {
            'normal': {
              'color': 'rgba(0,191,183,1)',
              'barBorderRadius': 0,
              'label': {
                'show': true,
                'shadowColor': 'rgba(0,0,0,0.4)',
                'shadowBlur': 10,
                'shadowOffsetY': 10,
                'position': 'top',
                formatter: function(p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            }
          },
          'data': [
            // 327,
            14901,
            14075,
            5387,
            19316,
            22646,
            5011,
            2243,
            4002,
            1550,
            2073,
            220
          ]
        }, {
          'name': '总数',
          'type': 'line',
          'stack': '总量',
          symbolSize: 10,
          symbol: 'circle',
          'itemStyle': {
            'normal': {
              'show': true,
              'shadowColor': 'rgba(0,0,0,0.4)',
              'shadowBlur': 10,
              'shadowOffsetY': 10,
              'color': 'rgba(252,230,48,1)',
              'barBorderRadius': 0,
              'label': {
                'show': true,
                'position': 'top',
                'shadowColor': 'rgba(0,0,0,0.4)',
                'shadowBlur': 10,
                'shadowOffsetY': 10,
                formatter: function(p) {
                  return p.value > 0 ? (p.value) : ''
                }
              }
            }
          },
          'data': [
            // 1036,
            25301,
            34006,
            24853,
            43285,
            63871,
            13175,
            20758,
            21008,
            14241,
            23395,
            19170
          ]
        }
        ]
      }
      var chart = echarts.init(this.$refs.chart, 'macarons')
      // debugger
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.chart {
  height: calc(100vh - 84px);
  width: 100%;
}
</style>
