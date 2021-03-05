<template>
<div>
	<div class="toolbar">
		<el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true" >新建</el-button>
	</div>
	<el-table
		:data="companyFiledsData" 
		height="920" 
		border	
		style="width: 100%"
	>
		<el-table-column 	align="center" type="index"	width="80" label="ID">
		</el-table-column>
	  <el-table-column align="center" label="企业名称" width="180">
        <template slot-scope="{row}">
          <span>{{ row.companyName }}</span>
        </template>
	  </el-table-column>
    <el-table-column align="center" label="楼宇名称" width="180">
				<template slot-scope="{row}">
					<span>{{ row.buildingName }}</span>
				</template>
	  </el-table-column>
	  <el-table-column align="center" label="联系人" width="180">
        <template slot-scope="{row}">
          <span>{{ row.contacts }}</span>
        </template>
    </el-table-column>
	  <el-table-column align="center" label="联系电话" width="180">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
    </el-table-column>

		<el-table-column min-width="180px" label="企业主营方向">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.businessDirection" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.businessDirection }}</span>
        </template>
    </el-table-column>

		<el-table-column align="center" label="编辑" width="220">
			<template slot-scope="{row}">
				<el-button
					v-if="row.edit"
					type="success"
					size="small"
					icon="el-icon-circle-check-outline"
					:loading="loading"
					@click="confirmEdit(row)"
				>
					{{confirm}}
				</el-button>
				<el-button-group v-else>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-edit"
						@click="row.edit=!row.edit"
					>
						修改
					</el-button>
					<el-button 
						type="primary" 
						size="small"
						icon="el-icon-delete"  
						@click="handleDelete(row)"
					>
						删除
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
			<el-form-item label="企业名称" >
				<el-input v-model="formData.companyName" placeholder="企业名称"></el-input>
			</el-form-item>
			<el-form-item label="楼宇名称" >
				<el-select v-model="formData.buildingName" placeholder="请选择" clearable >
					<el-option
						v-for="item in buildingsData"
						:key="item.id"
						:value="item.buildingName">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="联系人" >
				<el-input v-model="formData.contacts" placeholder="联系人"></el-input>
			</el-form-item>
			<el-form-item label="联系电话" >
				<el-input v-model="formData.phone" placeholder="联系电话"></el-input>
			</el-form-item>
			<el-form-item label="企业主营方向" >
				<el-input v-model="formData.businessDirection" placeholder="企业主营方向"></el-input>
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
import {getCompanySomeFileds, updateCompanyFields, getBuindingInfoByStatus, deleteCompany} from '@/api/company.js'

export default {
	name: 'buildingEcoTable',
	data (){
		return {
			companyFiledsData: [],
			dialogVisible: false,
			formData: {
				companyName:'',
				contacts: '',
				phone: '',
				businessDirection: '',
				buildingName: ''
			},
			buildingsData: [],
			confirm: '确认修改',
			formLabelWidth: '100px',
			loading: false
		}
	},
	mounted (){
		this.getCompanyFields();
		this.getBuildingInfo();
	},
	methods: {
		//请求楼栋数据
		getBuildingInfo() {
			getBuindingInfoByStatus().then(res => {
				this.buildingsData = res;
			})
		},
		//为每条信息（对象）添加新属性
		handleCompanyFields(res) {
			this.companyFiledsData = res.map(item => {
				// debugger;
				item.edit = false;
				item.originBusinessDirection = item.businessDirection
				return item;
			});			 
		},
		//请求数据
		getCompanyFields () {
			getCompanySomeFileds().then( res => {
				// debugger;
				this.handleCompanyFields(res);
			}).catch( err =>{
				console.log(err);
			})
		},
		//确认修改信息
		confirmEdit (row){
			// debugger;
			row.edit = false;
			row.originBusinessDirection = row.businessDirection;
			this.loading = true;

			updateCompanyFields({
				"companyName": row.companyName,
        "contacts": row.contacts,
        "phone": row.phone,
				"businessDirection": row.businessDirection,
				"buildingName": row.buildingName 
			}).then(res => {
				// debugger;
				this.loading = false;
				this.handleCompanyFields(res);
				this.$message({
					message: "成功修改数据",
					type: 'success'
				});
			}).catch(err => {
				this.loading = false;
				console.log(err);
			});
		},
		//确认新建信息
		onSubmit(){
			this.loading = true;
		  updateCompanyFields(this.formData).then(res => {
				// debugger; 
				this.loading = false;
				this.handleCompanyFields(res);
				this.$message({
					message: "新建成功",
					type: 'success'
				});
				this.dialogVisible = false;
			}).catch(err => {
				this.loading = false;
				console.log(err);
				this.dialogVisible = false;
			})
		},
		cancelEdit(row) {
			row.edit = false;
			row.businessDirection = row.originBusinessDirection;
		},
		//删除信息
		handleDelete(row, operator) {
			// debugger;
			const arr = [];
			arr.push(row.companyName);
			deleteCompany(arr).then(res => {
				this.handleCompanyFields(res);
				this.$message({
					message: `删除成功`,
					type: 'success'
				})
			}).catch(err => {
				console.log(err);
			})
		}

	}
}
</script>

<style scoped>
 .toolbar{
	 margin: 5px;
 }
 .edit-input{
	 padding-right: 100px;
 }
 .cancel-btn{
	 position: absolute;
	 right: 15px;
 }
</style>