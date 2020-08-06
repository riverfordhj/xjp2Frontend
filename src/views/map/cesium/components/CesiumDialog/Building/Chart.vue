<template>
  <div style="width:100%;">
    <div
      id="chart1"
      ref="chart1"
      class="chart"
    >加载中...</div>
    <div
      id="chart2"
      ref="chart2"
      class="chart"
    >加载中...</div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getPeopleByBuilding } from '@/api/people.js'

export default {
  name: '',
  props: {
    title: {
      type: String,
      default: 'G12-1'
    }
  },
  data() {
    return {
      list: [],
      gender: {
        male: 0,
        female: 0
      },
      age: {
        twelve: 0,
        forty_five: 0,
        sixty: 0,
        sixty_five: 0,
        eighty: 0,
        ninety: 0,
        hundred: 0
      }
    }
  },
  mounted() {
    var self = this
    getPeopleByBuilding(this.title).then(res => {
      debugger
      this.list = res.data
      this.list.map(l => {
        if (l.Gender === '男') {
          this.gender.male++
        } else {
          this.gender.female++
        }

        var age = this.caculateAge1(l.IDCard)
        switch (true) {
          case age < 12:
            this.age.twelve++
            break
          case age < 45:
            this.age.forty_five++
            break
          case age < 60:
            this.age.sixty++
            break
          case age < 65:
            this.age.sixty_five++
            break
          case age < 80:
            this.age.eighty++
            break
          case age < 90:
            this.age.ninety++
            break
          default:
            this.age.hundred++
            break
        }
      })
      self.initChart1()
      self.initChart2()
    })
  },
  methods: {
    initChart1() {
      var chart = echarts.init(chart1, 'macarons')

      chart.setOption({
        backgroundColor: '#2c343c',

        title: {
          text: '人口性别比例',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0.5, 1]
          }
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: this.gender.male, name: '男' },
              { value: this.gender.female, name: '女' }
            ].sort(function(a, b) { return a.value - b.value }),
            roseType: 'angle',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    initChart2() {
      var chart = echarts.init(chart2, 'macarons')
      chart.setOption({
        title: {
          text: '年龄分布',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {},
        backgroundColor: '#2c343c',
        xAxis: {
          type: 'category',
          data: ['0-12', '12-45', '45-60', '60-65', '65-80', '80-90', '90-']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: Object.keys(this.age).map(key => this.age[key]),
          // data: [this.age.twelve, this.age.forty_five, this.age.sixty, this.age.sixty_five, this.age.eighty, this.age.ninety, this.age.ninety],
          type: 'bar'
        }]
      })
    },
    caculateAge(idCard) {
      var date = new Date()
      var year = date.getFullYear()
      var birthday_year = parseInt(idCard.substr(6, 4))
      return year - birthday_year
    },
    caculateAge1(idCard, deadline = new Date()) {
      var len = (idCard + '').length
      var strBirthDay = ''
      if (len === 18) {
        strBirthDay = `${idCard.substr(6, 4)}/${idCard.substr(10, 2)}/${idCard.substr(12, 2)}`
      }
      if (len === 15) {
        var birthdayValue = ''
        birthdayValue = idCard.charAt(6) + idCard.charAt(7)
        if (parseInt(birthdayValue) < 10) {
          strBirthDay = `20${idCard.substr(6, 2)}/${idCard.substr(8, 2)}/${idCard.substr(10, 2)}`
        } else {
          strBirthDay = `19${idCard.substr(6, 2)}/${idCard.substr(8, 2)}/${idCard.substr(10, 2)}`
        }
      }
      var birthDate = new Date(strBirthDay)
      var nowDateTime = deadline
      var age = nowDateTime.getFullYear() - birthDate.getFullYear()
      if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() === birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }
  }
}
</script>

<style scoped>
.chart {
  width: 50%;
  height: 400px;
  float: left;
}
</style>
