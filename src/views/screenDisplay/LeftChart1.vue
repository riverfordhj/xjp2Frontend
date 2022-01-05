<template>
  <div class="left-chart-1">
    <div class="lc1-header">徐家棚营收前十</div>
    <!-- <div class="lc1-details">设备运行总数<span>430</span></div> -->
    <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>

import { getRoomByBuilding,getCountTaxByBuilding,getCountRevenueByBuilding,
         getTotalTaRByBuilding,getIndustryTypeByBuilding, getTaxRoundByBuilding,getRevenueRoundByBuilding} from '@/api/company.js';

export default {
  name: 'LeftChart1',
  data () {
    return {
      config: {
        data:[],
        colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        unit: '万元'
      },
      countTax:[],
    }
  },
  created(){
      this.getComInfoByBuildingName();
  },
  methods:{
    getComInfoByBuildingName( ){
        //向后端请求 返回指定楼栋税收前十
        getCountTaxByBuilding('V+合伙人大厦').then(res =>{
          debugger
        this.config.data = JSON.parse(JSON.stringify(res).replace(/companyName/g, 'name').replace(/cTax/g, 'value').replace(/有限公司/g, '').replace(/分公司/g, '').replace(/有限责任公司/g, ''));
          console.log( this.config.data);
          this.config = {...this.config}
        }).catch(err => {
          console.log(err);
        });
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
.left-chart-1 {
  width: 100%;
  height: 37%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  .lc1-header {
    text-align: center;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin-bottom: 20px;
  }

  .lc1-details {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    text-indent: 20px;

    span {
      color: #096dd9;
      font-weight: bold;
      font-size: 35px;
      margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
