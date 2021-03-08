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
		multiHeader: {
			type: Array,
			default: function(){
				return [];
			}
		},
		mergesSetting: {
			type: Array,
			default: function(){
				return [];
			}
		},
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
				const mHeader = this.multiHeader;
				const tHeader = this.tableHeader;
				const filterVal = this.filterFields;
				const data = this.formatJson(filterVal)
				const merges = this.mergesSetting;
				
        excel.export_json_to_excel({
					multiHeader: mHeader,
          header: tHeader,
					merges,
					data,
          filename: 'table-list'
        });
        this.downloadLoading = false;
      })
    },
    formatJson(filterVal) {
      return this.personHouseData.map(objItem => filterVal.map((item, index) => {
				if(item === '单元号' || item === '房号'){
					debugger;
				  return this.parseAddress(objItem, item);
				}else if(item.includes('.')){
					//取深层对象值
					const tempList = item.split('.');
					const deepObj = tempList[0];
					const objKey = tempList[1];
					return objItem[deepObj][objKey];
				}else if(item === ''){
					debugger;
					return '';
				}else{
					return objItem[item];
				}
      }))
		},
		parseAddress(objItem, item){
				debugger;
			if(item === '单元号'){
				return objItem["roomName"].split('-')[0];
			}else if(item === '房号'){
				return objItem["roomName"].split('-')[1];
			}
		}
	}
}
</script>

<style scoped>
 .download-container{
	 display: inline-block;
 }
 .filter-item{
	 padding-left: 10px;
	 padding-right: 10px;
 }
</style>