<template>
	<div class="container">
		<upload-excel @chansferSheetJson="ModifyJsonData" :label-name="labelName"></upload-excel>
	</div>
</template>

<script>
import uploadExcel from '@/components/uploadExcel.vue';
import { batchingRoomsDataWithExcel } from '@/api/house.js';

export default {
  name: 'batchingCreateRoom',
  props: {
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
  components: {
		uploadExcel
	},
  methods:{
		//整合后的json数据传递至后端
		BatchingRoomsJsonData(jsonData){
			batchingRoomsDataWithExcel(jsonData).then(res => {
				this.$emit('tranferRoomData', res);//返回数据导入的结果数组（导入未成功的数据条对应一个）
			}).catch(err => {
				console.log(err);
			});
		},
		//修改Json数据结构，作为参数传入后端
		ModifyJsonData(jsonDataArray){
			//获取列名数组
			const excelHeader = jsonDataArray[0];
			const isPass = this.tableHeaderVerification(excelHeader);
			if(!isPass){
				this.errorFun();
				return;
			}
			//获取数据主体
			const mainBody = jsonDataArray.slice(1);

			const modifiedJsonData = mainBody.map((dataItem) => {
				return this.fieldsMap(dataItem);
			});
			this.BatchingRoomsJsonData(modifiedJsonData);
		},
		fieldsMap(dataItem){
			const newDataItem = {};
			this.standardHeaderEn.forEach((headerItem, index) => {
				//合并"单元号"和"房号"为"roomName"
				if(headerItem === '房屋底面高程'){
					newDataItem['Height'] = `${parseFloat(dataItem[index]) + parseFloat(dataItem[index + 1] / 2)}`;
				}else if(headerItem === '单元号'){
					newDataItem["roomName"] = `${dataItem[index]}-${dataItem[index + 1]}`;
				}else if(headerItem === '房号' || headerItem === '层高' || headerItem === ''){
					return false;
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
		errorFun(){
			this.$message.error('上传文件内容格式不正确');
		},
 }
}
</script>

<style scoped>
 .container{
	 display: inline-block;
 }
</style>