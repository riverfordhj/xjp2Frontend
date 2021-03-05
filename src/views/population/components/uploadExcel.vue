<template>
	<div class="upload-excel-container">
		<input ref="load-excel-input" type="file" class="load-excel" accept=".xlsx, .xls" @change="handleUpload">
		<el-button 
		  type="primary"
			:loading="loading"
      @click="handleClickForUpload"
		>
			{{labelName}}
			<i class="el-icon-upload el-icon--right"></i>
		</el-button>
	</div>
</template>

<script>
import xlsx from 'xlsx';
import {BatchingPersonHouseData} from '@/api/person.js'; 

export default {
	name: 'uploadExcel',
	props:{
		labelName: {
			type: String,
			default: 'upload-excel'
		},
		standardHeader: {
			type: Array,
			required: true,
			default() {
				return [];
			}
		},
		standardHeaderEn:{
			type: Array,
			required: true,
			default() {
				return [];
			}
		}
	},
	data(){
		return {
			loading: false
		}
	},
	methods:{
		//整合后的json数据传递至后端
		BatchingPersonHouseJsonData(jsonData){
			BatchingPersonHouseData(jsonData).catch(err => {console.log(err)});
		},
		handleUpload(e){
			const files = e.target.files;
			const rawFile = files[0];
			this.upload(rawFile);
		},
		handleClickForUpload(){
			this.$refs['load-excel-input'].click();
		},
		upload(rawFile){
			this.$refs['load-excel-input'].value = null;// fix can't select the same excel
			this.readerData(rawFile);
		},
		//修改Json数据结构，作为参数传入后端
		ModifyJsonData(jsonDataArray){
			//获取列名数组
			const excelHeader = jsonDataArray[1];
			const isPass = this.tableHeaderVerification(excelHeader);
			if(!isPass){
				this.errorFun();
				return;
			}
			//获取数据主体
			const mainBody = jsonDataArray.slice(2);
			const modifiedJsonData = mainBody.map((dataItem) => {
				return this.fieldsMap(dataItem);
			});
      
			this.BatchingPersonHouseJsonData(modifiedJsonData);
		},
		fieldsMap(dataItem){
			const newDataItem = {};
			this.standardHeaderEn.forEach((headerItem, index) => {
				//合并"单元号"和"房号"为"roomName"
				if(headerItem === '单元号'){
					newDataItem["roomName"] = `${dataItem[index]}-${dataItem[index + 1]}`;
				}else if(headerItem === '房号' || headerItem === ''){
					return false;
				}else if(index === (this.standardHeaderEn.length - 1)){
					newDataItem['operation'] = 'creating';
					newDataItem['status'] = 'committed';
				}else{
					newDataItem[headerItem] = dataItem[index];
				}
			})
			return newDataItem;
		},
		//验证上传的excel列名是否符合规范
		tableHeaderVerification(excelTableHeader){
			if(!Array.isArray(excelTableHeader)){
				return;
			}
			const isPass = this.standardHeader.every((item, index) => {
				return item === excelTableHeader[index].trim();
			});
			return isPass;
		},
		readerData(rawFile){
			this.loading = true;
			const reader = new FileReader();
			
			let workBook;
			new Promise((resolve, reject) => {
				reader.onload = e => {
					const data = e.target.result;
					workBook = xlsx.read(data, {type: 'array', cellDates: true});
					this.loading = false;
					resolve();
				};
				reader.readAsArrayBuffer(rawFile)
			}).then(() => {
				this.formatResult(workBook, this.ModifyJsonData);
			}) 
		},
		formatResult(data,callback){
			// 获取总数据
			const sheets = data.Sheets;
			const sheetNames = data.SheetNames;
			if(sheetNames.length != 1){
		    this.errorFun();
				return;
			}

			const firstSheetName = sheetNames[0];
			const workSheet = sheets[firstSheetName];

		  const sheetJson = xlsx.utils.sheet_to_json(workSheet, { header: 1, defval: '' });
			// 格式化Item时间数据
			this.formatItemDate(sheetJson);
			// 格式化Item合并数据
			this.formatItemMerge(workSheet, sheetJson);
		
			// 返回数据
			callback(sheetJson)
		},
		errorFun(){
			this.$message.error('上传文件内容格式不正确');
		},
		formatItemDate(data){
			data.forEach((row) => {
			row.forEach((item, index) => {
				// 若有数据为时间格式则格式化时间
				if (item instanceof Date) {
					// 坑：这里因为XLSX插件源码中获取的时间少了近43秒，所以在获取凌晨的时间上会相差一天的情况,这里手动将时间加上
					var date = new Date(Date.parse(item) + 43 * 1000);
					row[index] = `${date.getFullYear()}-${String(
					date.getMonth() + 1
					).padStart(2, 0)}-${String(date.getDate()).padStart(2, 0)}`;
				}
				});
			});
		},
		formatItemMerge(sheetItem, data){
			const merges = sheetItem['!merges'] || [];
			merges.forEach((el) => {
				const start = el.s;
				const end = el.e;
				// 处理行合并数据
				if (start.r === end.r) {
				const item = data[start.r][start.c];
				for (let index = start.c; index <= end.c; index++) {
					data[start.r][index] = item;
				}
				}
				// 处理列合并数据
				if (start.c === end.c) {
				const item = data[start.r][start.c];
				for (let index = start.r; index <= end.r; index++) {
					data[index][start.c] = item;
				}
				}
			});
		}
	}
		
}
</script>

<style>
 .load-excel{
	 display: none;
	 z-index: -9999;
 }
 
 .upload-excel-container{
	 display: inline-block;
 }
</style>