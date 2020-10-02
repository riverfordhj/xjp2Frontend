<template>
<div>
	<el-table
	:data="companyFiledsData" height="920" border	style="width: 100%">
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
	 <el-table-column align="center" label="企业主营方向" width="180">
        <template slot-scope="{row}">
          <span>{{ row.businessDirection }}</span>
        </template>
    </el-table-column>
		<!-- <el-table-column prop="contacts" label="联系人" width="180">
		</el-table-column>
		<el-table-column prop="phone" label="联系电话" width="180">
		</el-table-column>
		<el-table-column prop="businessDirection" label="企业主营方向" width="180">
		</el-table-column> -->

		<el-table-column label="Actions" align="center" width="430" class-name="small-padding fixed-width">
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
      </el-table-column>
	</el-table>
</div>
</template>

<script>
import {getCompanySomeFileds} from '@/api/company.js'

export default {
	name: 'buildingEcoTable',
	data (){
		return {
			companyFiledsData: []
		}
	},
	mounted (){
		this.getCompanyFields();
	},
	methods: {
		getCompanyFields () {
			getCompanySomeFileds().then( res => {
				this.companyFiledsData = res;
			}).catch( err =>{
				console.log(err);
			})
		},
		handleUpdate(){

		},
		handleModifyStatus(row, status){
			debugger;
			this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status

		},
		handleDelete(row, index) {
			debugger;
			this.companyFiledsData.splice(index, 1)
		}
	}
}
</script>

<style>

</style>