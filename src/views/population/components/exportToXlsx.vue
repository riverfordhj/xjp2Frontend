<template>
	<div class="download-container">
		<el-button 
				:loading="downloadLoading" 
				class="filter-item" 
				type="primary" 
				icon="el-icon-download" 
				@click="handleDownload"
			>
				{{LabelName}}
			</el-button>
	</div>
</template>

<script>
export default {
	name:'exportToXlsx',
	props:{
		tableHeader: {
			type: Array,
			required: true
		},
		filterFields: {
			type: Array,
			required: true
		},
		personHouseData: {
			type: Array,
			required: true
		},
		LabelName: {
			type: String,
			default: '导出'
		}

	},
	data(){
		return {
			downloadLoading: false,
			personHouseInfo: this.personHouseData
		}
	},
	methods: {
		//下载表格，格式为xlsx
		handleDownload() {
      this.downloadLoading = true;
      import('@/vendor/Export2Excel').then(excel => {
				const tHeader = this.tableHeader;
				const filterVal =  this.filterFields;
				const data = this.formatJson(filterVal)
				
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        });
        this.downloadLoading = false;
      })
    },
    formatJson(filterVal) {
      return this.personHouseData.map(objItem => filterVal.map((item, index) => {
				if(item === '所属楼栋'){
				  return this.parseAddress(objItem);
				}else if(item.includes('.')){
					//取深层对象值
					const tempList = item.split('.');
					const deepObj = tempList[0];
					const objKey = tempList[1];
					return objItem[deepObj][objKey];
				}else{
					return objItem[item];
				}
      }))
		},
		parseAddress(objItem){
			return `${objItem["communityName"]}-网格${objItem["netGrid"]}-${objItem["buildingName"]}栋`;
		}
	}
}
</script>

<style scoped>
 .download-container{
	 display: inline-block;
 }
 .filter-item{
	 padding-left: 15px;
	 padding-right: 15px;
 }
</style>