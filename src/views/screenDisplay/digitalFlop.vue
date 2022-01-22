<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">{{ item.title }}</div>
      <div class="digital-flop">
        <dv-digital-flop
          :config="item.number"
          style="width:120px;height:60px;"
        />
          <div class="unit">{{ item.unit }}</div>
      </div>
    </div>

    <dv-decoration-10 />
  </div>
</template>

<script>
import { GetTotalTaRNO } from '@/api/company.js';
export default {
  name: 'DigitalFlop',
  data () {
    return {
      companycount:[],
      taxsum:[],
      revenuesum:[],
      digitalFlopData:[],
    
    }
  },
  created(){
     this.getcountData();
  },
  methods: { 
    getcountData(){
      GetTotalTaRNO().then(res =>{
          this.revenuesum.push(res[0].tRevenue / 10000);
          this.companycount.push(res[0].companyCount) ;
          this.taxsum.push(res[0].tTax / 10000) ;
          this.digitalFlopData = [
              {
                title: '徐家棚总营收',
                number: {
                  number: this.revenuesum,
                    toFixed: 2,
                  content: '{nt}{nt}',
                  textAlign: 'center',
                  style: {
                    fill: '#4d99fc',
                    fontWeight: 'bold'
                  }
                },
                unit: '亿'
              },
              {
                title: '徐家棚总税收',
                number: {
                  number: this.taxsum,
                  toFixed: 2,
                  content: '{nt}',
                  textAlign: 'right',
                  style: {
                    fill: '#f46827',
                    fontWeight: 'bold'
                  }
                },
                unit: '亿'
              },
              {
                title: '楼宇数量',
                number: {
                  number: [23],
                  content: '{nt}',
                  textAlign: 'right',
                  style: {
                    fill: '#40faee',
                    fontWeight: 'bold'
                  }
                },
                unit: '栋'
              },
              {
                title: '总企业数量',
                number: {
                  number: this.companycount,
                  content: '{nt}',
                  textAlign: 'right',
                  style: {
                    fill: '#40faee',
                    fontWeight: 'bold'
                  }
                },
                unit: '个'
              },
            ]
      })
    },
  },
  mounted () {
 
  }
}
</script>

<style lang="less">
#digital-flop {
  position: relative;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(6, 30, 93, 0.5);

  .dv-decoration-10 {
    position: absolute;
    width: 95%;
    left: 2.5%;
    height: 5px;
    bottom: 0px;
  }

  .digital-flop-item {
    width: 20%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-left: 3px solid rgb(6, 30, 93);
    border-right: 3px solid rgb(6, 30, 93);
  }

  .digital-flop-title {
    // margin-top: 3px;
    font-size: 20px;
     margin-bottom: 10px;
  }

  .digital-flop {
    display: flex;
  }

  .unit {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 13px;
  }
}
</style>
