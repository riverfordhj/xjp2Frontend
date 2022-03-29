<template>
    <div class="app-container">
			<div class="toolbar">
				<el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true" >新建</el-button>
			</div>
			<el-table :data="rainPoint" height="835" border style="width: 100%">
				<el-table-column 	align="center" type="index" width="80" label="ID" fixed="left">

				</el-table-column>
				<el-table-column align="center" label="用户名"  width="200">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.name" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.name }}</span>
					</template>
				</el-table-column>
						<el-table-column align="center" label="密码">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.note" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.note }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="注册时间" width="200">
					<template slot-scope="{row}">
						<span>{{ row.reportTime }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="联系人" width="160">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.report" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.report }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="联系方式" width="200">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.height" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.height }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="账号状态" width="160">
					<template slot-scope="{row}">
						<el-select v-if="row.edit" v-model="row.status" size="small" placeholder="请选择">
							<el-option v-for="item in ttstatus" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<span v-else>{{ row.status }}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="权限类型" width="160">
					<template slot-scope="{row}">
						<el-select v-if="row.edit" v-model="row.type" size="small" placeholder="请选择">
							<el-option v-for="item in tttype" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<span v-else>{{ row.type }}</span>
					</template>
				</el-table-column>
		
				<el-table-column   align="center" label="编辑" width="240">
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
				<el-form-item label="用户名" >
				<el-input v-model="formData.name" placeholder="用户名"></el-input>
				</el-form-item>
				<el-form-item label="用户密码" >
				<el-input v-model="formData.note" placeholder="用户密码"></el-input>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-date-picker
					 type="datetime" 
					 v-model="formData.reportTime" 
					 placeholder="选择日期时间"
					 value-format="yyyy-MM-dd HH:mm:ss"
					 style="width:100%">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="联系人" >
				<el-input v-model="formData.report" placeholder="联系人"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" >
				<el-input v-model="formData.height" placeholder="联系方式"></el-input>
				</el-form-item>
				<el-form-item label="账号状态" >
				<el-select v-model="formData.status" placeholder="请选择" clearable style="width:100%">
					<el-option
						v-for="item in ttstatus"
						:key="item"
						:value="item">
					</el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="类型" >
				<el-select v-model="formData.type" placeholder="请选择" clearable style="width:100%">
					<el-option
						v-for="item in tttype"
						:key="item"
						:value="item">
					</el-option>
				</el-select>
				</el-form-item>
				<!-- <el-form-item label="备注" >
				<el-input v-model="formData.note" placeholder="备注"></el-input>
				</el-form-item> -->
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
							reportTime:'',
							type:'',
							address:'',
							note:''
						},
						ttstatus: ["正常","锁定"],
						tttype: ["社区","街道","网格员","自定义"],
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
						"reportTime": row.reportTime,
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
							reportTime:'',
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
