<template>
    <div class="app-container">
        <!-- <div class="upload-img-container">
            <upload-image :label-name="labelName"></upload-image>
        </div> -->
			<el-table :data="rainPoint" height="835" border style="width: 100%"  @row-dblclick="handleDoubleClick">
				<el-table-column align="center" type="index" width="50" label="ID" fixed="left">

				</el-table-column>
				<el-table-column align="center" label="名称"  width="80">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.name" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="经度" width="170">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.longitude" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.longitude }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="纬度" width="170" >
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.latitude" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.latitude }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="高度" width="80">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.height" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.height }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="上报人" width="80">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.report" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.report }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="上报时间" width="80">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.reportTime" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.reportTime }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="状态" width="80">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.status" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.status }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="类型" width="80">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.type" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.type }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="地址"  width="170">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.address" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.address }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="备注">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.note" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.note }}</span>
					</template>
				</el-table-column>

                <el-table-column  align="center" label="上传" width="170" fixed="right">
					<template slot-scope="{row}">
			            <upload-image label-name="上传照片" :rowdata="row" ></upload-image>					
					</template>
                </el-table-column>

                <el-table-column  align="center" label="编辑" width="220" fixed="right">
				<template >
				<el-button-group>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-edit"
						
					>
						修改
					</el-button>
					<el-button 
						type="primary" 
						size="small"
						icon="el-icon-delete"  
						
					>
						删除
					</el-button>
				</el-button-group>

				</template>
			</el-table-column>
         </el-table>
    </div>
</template>

<script>

import uploadImage from '@/components/uploadImage.vue';
import "cesium/Widgets/widgets.css";
import {GetRainPoint } from '@/api/person.js'
import checkPermission from '@/utils/permission.js';//权限判断函数
export default {
    name:'rain',
    props:{
		labelName: {
			type: String,
			default: 'upload-Image'
		},
	},
    data(){
        return{
            rainPoint:[],
        }
    },
    components: {
	   uploadImage
	},
    computed:{

    },
    created(){
       this.getRainPoint();
    },
    methods:{
        getRainPoint(){
            GetRainPoint().then(res =>{
                this.rainPoint = res;
            }).catch(error =>{
                console,log(error);
            })
        },
        handleDoubleClick(row){
            if(checkPermission('Administrator')){
                this.$router.push({name: 'PersonHouseMap'});   
                      debugger          
                const position = { 
                    long: row.longitude,
                    lat: row.latitude,
                    height: row.height
                }
                this.bus.$emit("transferRoomId", position);
           
            }     
        },
  
    },
}
</script>

<style>
  .el-table .warning-row {
    background:	#faebd7;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }

</style>