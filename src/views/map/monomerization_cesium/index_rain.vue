<template>
    <div class="app-container">
			<div class="toolbar">
				<el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true" >新建</el-button>
			</div>
			<el-table :data="rainPoint" height="835" border style="width: 100%"  @row-dblclick="handleDoubleClick">
				<el-table-column 	align="center" type="index" width="50" label="ID" fixed="left">

				</el-table-column>
				<el-table-column align="center" label="名称"  width="80">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.name" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.name }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="经度" width="170">
					<template slot-scope="{row}">
						<span>{{ row.longitude }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="纬度" width="170" >
					<template slot-scope="{row}">
						<span>{{ row.latitude }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="高度" width="100">
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
				<el-table-column align="center" label="状态" width="100">
					<template slot-scope="{row}">
						<el-select v-if="row.edit" v-model="row.status" size="small" placeholder="请选择">
							<el-option v-for="item in ttstatus" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<span v-else>{{ row.status }}</span>
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
				<el-table-column   align="center" label="编辑" width="240" fixed="right">
				<template slot-scope="{row}">
					<el-button-group  v-if ="row.edit === false" :key="row.id">
						<el-button
							type="warning"
							size="small"
							icon="el-icon-delete" 
							@click="handleDelete(row)"
						>
							删除
						</el-button>
						<el-button
							type="primary"
							size="small"
							icon="el-icon-edit"
							@click="row.edit = true"
						>
							修改
						</el-button>
					</el-button-group>
					<el-button-group v-else-if="row.edit === true">
						<el-button
							class="cancel-btn"
							size="small"
							type="warning"
							@click="cancelEdit(row)"
						>
							取消
						</el-button>
						<el-button
							type="success"
							size="small"
							@click="confirmEdit(row)"
						>
							提交
						</el-button>
					</el-button-group>
				</template>
			</el-table-column>
			</el-table>

    	<el-dialog
			title="新建"
			:visible.sync="dialogVisible"
			width="30%"
			center>
			<el-form  :model="formData" class="demo-form-inline" label-width="100px">
				<el-form-item label="名称" >
				<el-input v-model="formData.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="经度" >
				<el-input v-model="formData.longitude" placeholder="经度"></el-input>
				</el-form-item>
				<el-form-item label="纬度" >
				<el-input v-model="formData.latitude" placeholder="纬度"></el-input>
				</el-form-item>
				<el-form-item label="高度" >
				<el-input v-model="formData.height" placeholder="高度"></el-input>
				</el-form-item>
				<el-form-item label="上报人" >
				<el-input v-model="formData.report" placeholder="上报人"></el-input>
				</el-form-item>
				<el-form-item label="状态" >
				<el-select v-model="formData.status" placeholder="请选择" clearable >
					<el-option
						v-for="item in ttstatus"
						:key="item"
						:value="item">
					</el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="类型" >
				<el-input v-model="formData.type" placeholder="类型"></el-input>
				</el-form-item>
				<el-form-item label="地址" >
				<el-input v-model="formData.address" placeholder="地址"></el-input>
				</el-form-item>
				<el-form-item label="备注" >
				<el-input v-model="formData.note" placeholder="备注"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="warning" icon="el-icon-refresh" @click="dialogVisible = false" >取 消</el-button>
				<el-button type="primary" icon="el-icon-check" :loading="loading" @click="onSubmit">确 定</el-button>
				</span>
			</el-dialog>

    </div>
</template>

<script>
var Cesium = require("cesium/Cesium");
import "cesium/Widgets/widgets.css";
import uploadImage from '@/components/uploadImage.vue';
import {GetRainPoint, DeleteTargetRain, CreateTargetRain, UpdateTargetRain} from '@/api/person.js'
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
						tempRainPoint:[],
						dialogVisible: false,
						formData: {
							id:'0000',
							name:'',
							longitude:'',
							latitude:'',
							height:'',
							report:'',
							status:'',
							type:'',
							address:'',
							note:''
						},
						ttstatus: ["未处理","已处理"],
			      confirm: '确认',
						cancel: '取消',
			      formLabelWidth: '100px',
			      loading: false,
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
                this.rainPoint = res.map(item =>{
									item.edit = false;
									return item;
								});
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
				confirmEdit (row){
					this.rowEdit = false;
					this.loading = true;
					if(row.height != ''){
						UpdateTargetRain({
						"id": "0000",
						"name": row.name,
						"longitude": row.longitude,
						"latitude": row.latitude,
						"height": row.height,
						"report": row.report ,
						"status": row.status,
						"type": row.type,
						"address": row.address,
						"note": row.note
						}).then(res => {
							this.loading = false;
							this.getRainPoint();
							this.$message({
								message: "成功修改数据！",
								type: 'success'
							});
						}).catch(err => {
							this.loading = false;
							console.log(err);
						});
					}else{
						this.getRainPoint();
						this.$message.error("高度不能为空值！");
					}
				},
				handleDelete(row){
					//debugger
					DeleteTargetRain(row).then(res =>{
						//debugger
						this.$message({
							message: "删除成功！",
							type: 'success'
						});
						this.getRainPoint();
					})
				},
				onSubmit(){
					this.loading = true;
					if(this.formData.longitude != '' 
					&& this.formData.latitude != '' 
					&& this.formData.height != ''){
						CreateTargetRain(this.formData).then(res => {
						this.loading = false;
						this.$message({
							message: "新建成功！",
							type: 'success'
						});
						this.dialogVisible = false;
						this.formData = {
							id:'0000',
							name:'',
							longitude:'',
							latitude:'',
							height:'',
							report:'',
							status:'',
							type:'',
							address:'',
							note:''
						},
						this.getRainPoint();
						}).catch(err => {
							this.loading = false;
							console.log(err);
							this.dialogVisible = false;
						})
					}else{
						this.getRainPoint();
						this.loading = false;
						this.$message.error('经纬度及高度不能为空值！');
						
					}
				},
		    cancelEdit() {
			    this.rowEdit = false;
					this.getRainPoint();
					this.$message({
							message: "已取消编辑！",
							type: 'success'
						});
				},
    }
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