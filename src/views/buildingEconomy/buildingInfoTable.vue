<template>
	<div class="container">
		<el-table :data="buildingsInfo" height="920" border style="width: 100%">
			<el-table-column 	type="index"	width="50">
			</el-table-column>
			<el-table-column prop="buildingName" label="项目名称" width="180">
			</el-table-column>
			<el-table-column prop="legalEntity" label="项目建设（法人）单位" width="180">
			</el-table-column>
			<el-table-column prop="constructionSite" label="建设地点" width="180">
			</el-table-column>
			<el-table-column prop="startTime" label="开工时间" width="180">
			</el-table-column>
			<el-table-column prop="completionTime" label="竣工时间" width="180">
			</el-table-column>
			<el-table-column prop="status" label="项目状态" align="center" class-name="status-col" width="180" >
				<template slot-scope="{row}" effect="dark">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
			</el-table-column>
			<el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
					<el-button v-if="row.status !='即将新建'" size="mini" @click="handleModifyStatus(row,'即将新建')">
            即将新建
          </el-button>
          <el-button v-if="row.status !='在建'" size="mini" @click="handleModifyStatus(row,'在建')">
            在建
          </el-button>
          <el-button v-if="row.status !='已建'" size="mini" @click="handleModifyStatus(row,'已建')">
            已建
          </el-button>

        </template>
      </el-table-column>
		</el-table>
	</div>
</template>

<script>
import {getCompanyBuildings, updateBuildingStatus} from '@/api/company'

export default {
	name: 'buildingInfoTable',
	data(){
		return {
			buildingsInfo: []
		}
	},
	filters:{
		statusFilter(statusParam){
			const statusMap = {
				'已建': 'success',
        '在建': 'warning',
        '即将新建': 'danger'
			};
			return statusMap[statusParam];
		}
	},
	mounted(){
		this.getBuilidngsInfo();
	},
	methods:{
		getBuilidngsInfo(){
			getCompanyBuildings().then((res) => {
				this.buildingsInfo  = res;
			})
		},
		handleModifyStatus(row, statusValue){
			debugger;
			// row.status = statusValue;
		  updateBuildingStatus(row.buildingName, statusValue).then((res) => {
				this.buildingsInfo = res;
			})

		}
	}
}
</script>

<style>

</style>