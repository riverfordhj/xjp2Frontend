<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config" />
  </div>
</template>

<script>
import { GetTotalTaR } from '@/api/company.js';
export default {
  name: 'ScrollBoard',
  data () {
    return {
      config: {
        header: ['楼宇名称', '营收/万', '税收/万', '数量'],
        data: [],
        index: true,
        columnWidth: [50,140,100,90],
        align: ['center'],
        rowNum: 6,
        // headerBGC: '#1981f6',
        headerHeight: 45,
         oddRowBGC: '#003B51',
         evenRowBGC: 'rgba(10, 29, 50, 0.8)'
      }
    }
  },
  created(){
      this.getrtData();
  },
  methods:{
      getrtData(){
         GetTotalTaR().then(res =>{
           let arr = [];
           if(res.length >0){
             for( let i in res){
               let cname = res[i].key;
               let tRevenue = res[i].tRevenue;
               let tTax = res[i].tTax;
               let ccount = res[i].companyCount;
               arr.push([cname,tRevenue,tTax,ccount])
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
#scroll-board {
  width: 100%;
  box-sizing: border-box;
   margin-right: 7px;
  height: 100%;
  overflow: hidden;
}
</style>
