<template>
  <div class="left-chart-3">
		<!-- 按钮 -->
	     <el-upload
	       class="lc1-details"
	       action=""
	       :multiple="false"
	       :show-file-list="false"
	       accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
	       :http-request="httpRequest">
	       <el-button type="text">徐家棚税收前10</el-button>
	     </el-upload>
	     <!-- 按钮 end -->
    <!-- <div class="lc3-header">徐家棚税收前10</div> -->
    <dv-capsule-chart class="lc3-chart" :config="config" />
  </div>
</template>

<script>
import { GetTaxTop } from '@/api/company.js';
import XLSX from 'xlsx';

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
    },
	    httpRequest (e) {
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
						this.bus.$emit('deliveryTaxInfo', exl)
						this.config.data = JSON.parse(JSON.stringify(exl).replace(/公司名称/g, 'name').replace(/税收/g, 'value').replace(/有限/g, '').replace(/公司/g, '').replace(/责任/g, '').replace(/管理/g, '').replace(/（）/g, ''));
						this.config.data.forEach(item =>{
						item.value = parseFloat((item.value / 10000).toFixed(3));
						})
						this.config = {...this.config}
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

  .lc1-details {
		margin-top: -30px;
    text-align: center;
    height: 40px;
    // font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
		// color: #fff;
    // text-indent: 20px;

    span {
			margin-top: -30px;
      color: #fff;
      // font-weight: bold;
      font-size: 16px;
      // margin-left: 20px;
    }
  }

  .lc3-chart {
    flex: 1;
  }
}
</style>
