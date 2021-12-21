<template>
<div>

       <!-- <el-image :src="src"></el-image> -->
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
		  test:"hejinin",
			loading: false,
			uploadUrl:"/api/ImgUpload/SingleFileUpload",
			  src: '/UploadFile/20211219/wwww_211949.png'
			//   src:"https://localhost:44318/UploadFile/20211216/fff_170014.jpg"
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
        // console.log(this.rowdata);
 },
 methods: {
		submitUpload(){			
           this.$refs.loadimage.submit();
		},
		imgSuccess(res,file,fileList){
			let isSuccess = true ;
			this.rowdata.filePath = res.completeFilePath,
		    SaveImgPath(this.rowdata).catch(err => {isSuccess = false; console.log(err);});
            console.log(this.rowdata);
			console.log(res.completeFilePath,1);
			console.log(file,2);
            console.log(fileList,3);
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