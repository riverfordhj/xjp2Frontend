<template>
	<div class="container">
		<upload-excel @chansferSheetJson="ModifyJsonData" :label-name="labelName"></upload-excel>
	</div>
</template>

<script>
import uploadExcel from '@/components/uploadExcel.vue';
import { BatchingPersonHouseData } from '@/api/person.js'; 

export default {
	name: 'batchingCreatePerson',
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
	components: {
		uploadExcel
	},
	methods:{
		//整合后的json数据传递至后端
		BatchingPersonHouseJsonData(jsonData){
			BatchingPersonHouseData(jsonData).then(res => {
				if(!this.checkDataRes(res)){
					return;
				}
				//收集已存在人员的信息，用于提示
				var errorList = [];
				res.forEach((curEle, curIndex) => {
					if(this.judgeInfo(curEle) && curEle.message === '已存在'){
						errorList.push(curIndex + 3)//收集错误项在excel表中对应的索引
					}
				});
				this.createPersonErrorFun(errorList, {info: '数据已存在，可查询后修改', type: 'warning'});
				this.$emit('uploadCompeleted');
			}).catch(err => {console.log(err)});
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
		errorFun(){
			this.$message.error('上传文件内容格式不正确');
		},
    
		

		//检查返回的数据结果:收集错误信息
		checkDataRes(dataRes){
			var errorList = [];
			var latch = true;
			if(Array.isArray(dataRes)){
				dataRes.forEach((item) => {
					if(this.judgeInfo(item) && item.message === '房屋地址不正确(填写错误或超出权限)'){
						latch = false;
						errorList.push(item.index +3);
					}
				});
			}
			if(!latch){
				this.createPersonErrorFun(errorList, {info: '房屋地址不正确，请修改后操作', type: 'error'});
			}	
			debugger;
			return latch;
		},
		//判断参数是否是对象，并拥有‘message’属性
		judgeInfo(objItem){
			return Object.prototype.toString(objItem) === '[object Object]' && objItem.hasOwnProperty('message'); 
		},
		//第二参数为函数配置项（对象）
		createPersonErrorFun(infoList, optionObj){
			if(Array.isArray(infoList) && infoList.length !== 0){
				const errString = infoList.join();
				this.showMessageInfo(true, 0, `Excel表格中第${errString}行：${optionObj.info}`, optionObj.type);
			}
		},
		//消息提示函数
		showMessageInfo(showClose, duration, message,type){
			this.$message({
				showClose,
				duration,
				message,
				type
			});
		}
	
	}
		
}
</script>

<style scoped>
 .container{
	 display: inline-block;
 }
</style>