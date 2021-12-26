<template>
<div>
		<el-upload ref="loadimage" 
		           :on-success="imgSuccess"
				   :on-remove="imgRemove"
				   :action="uploadUrl"
		           accept=".png, .jpg, .jpeg, .svg, .gif," 
				   >
										<el-button type="primary" :loading="loading" @click="submitUpload">
											<i class="el-icon-upload"></i>
											{{labelName}}
										</el-button>
		</el-upload>
</div>
</template>

<script>

import {SaveImgPath,GetRainPoint } from '@/api/person.js'

export default {
 name: '',
 data(){
	  return {
			loading: false,
		    uploadUrl:"/XjpBackend/api/ImgUpload/SingleFileUpload",
		}
 },
 props:{
	 	labelName: {
			type: String,
			default: 'upload-image'
		},
		rowdata:{
			type: Object,
		}
 },
 created(){
 },
 methods: {
		submitUpload(){			
           this.$refs.loadimage.submit();
		},
		imgSuccess(res,file,fileList){
			let isSuccess = true ;
			this.rowdata.filePath = res.completeFilePath,
		    SaveImgPath(this.rowdata).catch(err => {isSuccess = false; console.log(err);});
			console.log(res);
			this.$message({
					message: res,
					type: 'success'
				});
			// console.log(file,2);
            // console.log(fileList,3);
		},
		imgRemove(){

		},






 }
}
</script>

<style scoped>
	.load-image{
		display: none;
		z-index: -9999;
	}
	
	.upload-image-container{
		display: inline-block;
	}

	.upload-image-container >>> .el-button{
		padding: 12px 10px;
	}
</style>