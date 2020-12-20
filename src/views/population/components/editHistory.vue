<template>
	<el-dialog
		title="历史信息"
		:visible.sync="dialogVisible"
		width="80%"
		@close="handleClose"
	>
		<el-table :data="historyData" height="550" border style="width: 100%">
			<el-table-column 	align="center" type="index"	width="80" label="ID">
			</el-table-column>
			<!-- <el-table-column prop="companyName" label="企业名称" width="180">
			</el-table-column> -->
			<el-table-column align="center" label="身份证" width="180">
						<template slot-scope="{row}">
							<span>{{ row.personId }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="姓名" width="120">
						<template slot-scope="{row}">
							<span>{{ row.name }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="是否为户主" width="120">
						<template slot-scope="{row}">
							<span>{{ row.isHouseholder }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="与户主的关系" width="120">
						<template slot-scope="{row}">
							<span>{{ row.relationWithHouseholder }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="人口性质" width="120">
						<template slot-scope="{row}">
							<span>{{ row.populationCharacter }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="180px"  label="电话" >
						<template slot-scope="{row}">
							<span>{{row.phone}}</span>
						</template>
			</el-table-column>
		
			<el-table-column align="center" label="房屋性质" width="120">
						<template slot-scope="{row}">
							<span>{{ row.category }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="房间名" width="120">
						<template slot-scope="{row}">
							<span>{{ row.roomName }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="所属楼栋" width="180">
						<template slot-scope="{row}">
							<span>{{ `${row.communityName}-网格${row.netGrid}-${row.buildingName}栋` }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="编辑类型" width="80">
						<template slot-scope="{row}">
							<span>{{categoryMap(row.operation) }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="编辑时间" width="120">
						<template slot-scope="{row}">
							<span>{{ row.editTime }}</span>
						</template>
			</el-table-column>
			
    </el-table>
	</el-dialog>
</template>

<script>
export default {
	name: 'editHistory',
	props: {
		historyData: {
      type: Array,
     
		},
		dialogVisibleForHistory: {
			type: Boolean,
			required: true,//是否必须传值
			default: false,//没有传值时,默认值
		}
	},
	data(){
		return {
			dialogVisible: this.dialogVisibleForHistory
		}
	},
	watch: {
		dialogVisibleForHistory(newVal, oldVal){
			this.dialogVisible = newVal;
		}
	},
	methods: {
		handleClose(){
			this.$emit('closeEditHistory', false);
		},
		categoryMap(operation){
			debugger;
			switch(operation){
				case 'creating': 
					return '新建';
				case 'updating':
					return '更新'
				case 'deleting':
					return '删除'
			}
		}
	}
}
</script>

<style>

</style>