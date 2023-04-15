<template>
  <div class="left-chart-1">
    <!-- 按钮 -->
    <el-upload class="lc1-details" action="" :multiple="false" :show-file-list="false"
      accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      :http-request="httpRequest">
      <el-button type="text">徐家棚营收前10</el-button>
    </el-upload>
    <!-- 按钮 end -->
    <!-- <el-button type="text" class="lc1-details" @click="uploadrevenuedata">徐家棚营收前10</el-button> -->
    <dv-capsule-chart class="lc1-chart" :config="config" />
    <dv-decoration-2 style="height:10px;" />
  </div>
</template>

<script>

import { GetRevenueTop } from '@/api/company.js';
import XLSX from 'xlsx';

export default {
  name: 'LeftChart1',
  data() {
    return {
      config: {
        data: [],
        colors: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        unit: '亿',
        showValue: true
      },
    }
  },
  created() {
    this.getRevenueTopByStreet();
  },
  methods: {
    getRevenueTopByStreet() {
      //向后端请求 返回指定楼栋营收前十
      // GetRevenueTop().then(res => {
      //   console.log(res, 'fgdsgdfsgdf')
      //   this.config.data = JSON.parse(JSON.stringify(res).replace(/companyName/g, 'name').replace(/cRevenue/g, 'value').replace(/(武汉)/g, '').replace(/有限/g, '').replace(/公司/g, '').replace(/湖北省/g, '').replace(/湖北/g, '').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
      //   this.config.data.forEach(item => {
      //     item.value = parseFloat((item.value / 10000).toFixed(3));
      //   })
      //   this.config = { ...this.config }
      // }).catch(err => {
      //   console.log(err);
      // });
      const res = [
        { companyName: '中煤华中能源有限公司', cRevenue: '1562094' },
        { companyName: '湖北省粮油（集团）有限责任公司', cRevenue: '1125827' },
        { companyName: '建发（武汉）有限公司', cRevenue: '1056760' },
        { companyName: '湖北省粮食有限公司', cRevenue: '568590' },
        { companyName: '中铁物贸集团武汉有限公司', cRevenue: '517993' },
        { companyName: '武汉清龙置业有限公司', cRevenue: '356741' },
        { companyName: '湖北人人大经贸有限公司', cRevenue: '128426' },
        { companyName: '武汉绿地滨江置业有限公司', cRevenue: '103224' },
        { companyName: '武汉恒信国泰贸易有限公司', cRevenue: '88129' },
        { companyName: '湖北景盛贸易有限公司', cRevenue: '81368' }
      ]
      this.config.data = JSON.parse(JSON.stringify(res).replace(/companyName/g, 'name').replace(/cRevenue/g, 'value').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
      this.config.data.forEach(item => {
        item.value = parseFloat((item.value / 10000).toFixed(3));
      })
      this.config = { ...this.config }
    },
    httpRequest(e) {
      let file = e.file // 文件信息
      console.log('e: ', e)
      console.log('file: ', e.file)

      if (!file) {
        // 没有文件
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        // 格式根据自己需求定义
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }

      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary' // 以字符编码的方式解析
          })
          const exlname = workbook.SheetNames[0] // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          // console.log(exl)
          this.bus.$emit('deliveryRevenueInfo', exl)
          this.config.data = JSON.parse(JSON.stringify(exl).replace(/公司名称/g, 'name').replace(/营收/g, 'value').replace(/有限/g, '').replace(/公司/g, '').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
          this.config.data.forEach(item => {
            item.value = parseFloat((item.value / 10000).toFixed(3));
          })
          this.config = { ...this.config }
          console.log(this.config.data)
          // 将 JSON 数据挂到 data 里
          // this.tableData = exl
          // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          console.log('出错了：：')
          return false
        }
      }
      fileReader.readAsBinaryString(file)
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
    // font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: #fff;
    // text-indent: 20px;

    span {
      color: #fff;
      // font-weight: bold;
      font-size: 16px;
      // margin-left: 20px;
    }
  }

  .lc1-chart {
    flex: 1;
  }
}
</style>
