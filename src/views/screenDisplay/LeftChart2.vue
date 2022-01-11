<template>
  <div class="left-chart-2">
    <!-- <div class="lc2-header">产业分布</div> -->
    <dv-scroll-board class="lc2-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>
import { getIndustryType } from '@/api/company.js';
export default {
  name: 'LeftChart2',
  data () {
    return {
      config: {
          header: ['产业名称', '营收/万', '税收/万', '数量'],
          data: [],
          index: true,
          // waitTime:5000,
          // carousel:'page',
          columnWidth: [48,100,95,80],
          align: ['center'],
          rowNum: 5,
          headerBGC: '#3399CC',
          headerHeight: 45,
          oddRowBGC: '#003B51',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  },
  created(){
      this.getindustryData();
  },
  methods:{
      getindustryData(){
         getIndustryType().then(res =>{
           let arr = [];
           if(res.length >0){
              for( let i in res){
                let industryName = res[i].industryName;
                let industryRevenue = res[i].industryRevenue;
                let industryTax = res[i].industryTax;
                let ccount = res[i].industryCompanyCount;
                arr.push([industryName,industryRevenue,industryTax,ccount])
              }
              this.config.data = arr;
              this.config = {...this.config};
           }
         })
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
.left-chart-2 {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;

  // .lc2-header {
  //   height: 20px;
  //   line-height: 20px;
  //   font-size: 16px;
  //     text-align: center;
  //     justify-content: center;
  //   align-items: center;
  //   margin-top: 10px;
  // }
  .lc2-chart {
    height: calc(~"100% - 50px");
  }
}
</style>
