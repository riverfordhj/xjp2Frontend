<template>
<div>
	<el-button type="primary" icon="el-icon-edit" @click="handleCreate" >Add</el-button>
	<el-table
		:data="companyFiledsData" 
		height="920" 
		border	
		style="width: 100%"
	>
	 <el-table-column align="center" label="企业名称" width="180">
        <template slot-scope="{row}">
          <span>{{ row.companyName }}</span>
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
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.businessDirection }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>

	

		<!-- <el-table-column label="Actions" align="center" width="430" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column> -->
	</el-table>
	<el-dialog
		title="新建"
		:visible.sync="dialogVisible"
		width="30%"
		center>
		<el-form  :model="formData" class="demo-form-inline">
			<el-form-item label="企业名称">
				<el-input v-model="formData.companyName" placeholder="企业名称"></el-input>
			</el-form-item>
			<el-form-item label="联系人">
				<el-input v-model="formData.contacts" placeholder="联系人"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="formData.phone" placeholder="联系电话"></el-input>
			</el-form-item>
			<el-form-item label="企业主营方向">
				<el-input v-model="formData.businessDirection" placeholder="企业主营方向"></el-input>
			</el-form-item>
		
			<el-form-item>
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="onSubmit">确 定</el-button>
			</el-form-item>
		</el-form>
	
	
	</el-dialog>
</div>
</template>

<script>
import {getCompanySomeFileds, updateCompanyFields} from '@/api/company.js'

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
				businessDirection: ''
			}
		}
	},
	mounted (){
		this.getCompanyFields();
	},
	methods: {
		getCompanyFields () {
			getCompanySomeFileds().then( res => {
				// debugger;
				res.map(item => {
					item.edit = false;
					item.originBusinessDirection = res.businessDirection
					
					return item;
				})
				this.companyFiledsData = res;
			}).catch( err =>{
				console.log(err);
			})
		},
		confirmEdit (row){
			// debugger;
			row.edit = false;
			row.originBusinessDirection = row.businessDirection;

			updateCompanyFields({
				"companyName": row.companyName,
        "contacts": row.contacts,
        "phone": row.phone,
        "businessDirection": row.businessDirection
			}).then(res => {

				console.log(res);
				this.$message({
					message: "成功修改数据",
					type: 'success'
				});
			}).catch(err => {
				console.log(err);
			});
		},
		handleCreate() {
			debugger;
			this.dialogVisible = true;
		},
		onSubmit(){
		  updateCompanyFields(this.formData).then(res => {
				console.log(res);
				this.$message({
					message: "新建成功",
					type: 'success'
				});
				this.dialogVisible = false;
			}).catch(err => {
				console.log(err);
				this.dialogVisible = false;
			})
		},
		cancelEdit(row){
			row.edit = false;
		}
		// handleUpdate(){

		// },
		// handleModifyStatus(row, status){
		// 	debugger;
		// 	this.$message({
    //     message: '操作Success',
    //     type: 'success'
    //   })
    //   row.status = status

		// },
		// handleDelete(row, index) {
		// 	debugger;
		// 	this.companyFiledsData.splice(index, 1)
		// }
	}
}
</script>

<style scoped>
 .edit-input{
	 padding-right: 100px;
 }
 .cancel-btn{
	 position: absolute;
	 right: 15px;
 }
</style>