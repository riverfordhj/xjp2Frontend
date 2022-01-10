<template>
  <div class="left-chart-1">
    <div class="lc1-details">徐家棚营收前10</div>
    <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>

import { GetRevenueTop} from '@/api/company.js';

export default {
  name: 'LeftChart1',
  data () {
    return {
      config: {
        data:[],
        colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
         unit: '亿',
         showValue: true
      },
    }
  },
  created(){
      this.getRevenueTopByStreet();
  },
  methods:{
    getRevenueTopByStreet( ){
        //向后端请求 返回指定楼栋营收前十
        GetRevenueTop().then(res =>{
        this.config.data = JSON.parse(JSON.stringify(res).replace(/companyName/g, 'name').replace(/cRevenue/g, 'value').replace(/有限/g, '').replace(/公司/g, '').replace(/湖北省/g, '').replace(/湖北/g, '').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
        this.config.data.forEach(item =>{
         item.value = parseFloat((item.value / 10000).toFixed(3));
        })
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
  height: 35%;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  // .lc1-header {
  //   text-align: center;
  //   height: 40px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   font-size: 20px;
  //   margin-bottom: 20px;
  // }

  .lc1-details {
    text-align: center;
    height: 40px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    // text-indent: 20px;

    // span {
    //   color: #096dd9;
    //   font-weight: bold;
    //   font-size: 35px;
    //   margin-left: 20px;
    // }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
