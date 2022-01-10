<template>
  <div class="left-chart-3">
    <div class="lc3-header">徐家棚税收前10</div>
    <dv-capsule-chart class="lc3-chart" :config="config" />
  </div>
</template>

<script>
import { GetTaxTop } from '@/api/company.js';
export default {
  name: 'LeftChart3',
  data () {
    return {
      config: {
        data: [],
        colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        unit: '百万',
        showValue: true
      }
    }
  },
  created(){
      this.getTaxTopByStreet();
  },
  methods:{
    getTaxTopByStreet( ){
        //向后端请求 返回指定楼栋税收前十
        GetTaxTop().then(res =>{
        this.config.data = JSON.parse(JSON.stringify(res).replace(/companyName/g, 'name').replace(/cTax/g, 'value').replace(/有限/g, '').replace(/公司/g, '').replace(/武汉市/g, '').replace(/武汉/g, '').replace(/责任/g, '').replace(/中心支/g, '').replace(/（）/g, ''));
        this.config.data.forEach(item =>{
         item.value = parseFloat((item.value / 100).toFixed(3));
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
.left-chart-3 {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;

  .lc3-header {
    height: 20px;
     text-align: center;
    font-size: 16px;
      justify-content: center;
    align-items: center;
    margin-top: -20px;
  }

  // .lc3-details {
  //   height: 40px;
  //   font-size: 16px;
  //   display: flex;
  //   align-items: center;
  //   text-indent: 20px;

  //   span {
  //     color: #096dd9;
  //     font-weight: bold;
  //     font-size: 35px;
  //     margin-left: 20px;
  //   }
  // }

  .lc3-chart {
    flex: 1;
  }
}
</style>
