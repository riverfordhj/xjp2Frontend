<template>
  <div>
    <el-table
	    ref="multipleTable"
			:data="userData" 
			height="835" 
			border
			class="userList"	
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column 
				v-if="checkPermission('Administrator')" 
				align="center" 
				type="selection" 
				width="40">
			</el-table-column>
			<el-table-column align="center" type="index" :index="customizeIndex"	width="50" label="ID" >
			</el-table-column>
			<el-table-column align="center" label="用户名" width="170" >
						<template slot-scope="{row}">
							<span>{{ row.userName }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="密码" width="170" >
						<template slot-scope="{row}">
							<span>{{ row.password }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="电话" width="170" >
						<template slot-scope="{row}">
							<span>{{ row.phone }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="编辑" width="220" >
				<template slot="header">
					<el-button 
						type="success"
						size="small"
						@click="toggleSelection()"
					>
						重置所选项
					</el-button>
				</template>
				<template  slot-scope="{row}">
					<el-button
						type="success"
						size="small"
					>
						重置
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		 <!-- 分页显示 -->
		<pagination :total-num="total" :page.sync="paginationSetting.curPage" :limit.sync="paginationSetting.limit" ></pagination>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission.js';//权限判断函数
import pagination from '../../components/pagination.vue';

import { getUsersData, resetUserPassword} from '@/api/user.js'

var selectionRowDatas = [];

export default {
  name: '',
  data() {
    return {
			userData: [],
			
			//分页默认配置
			paginationSetting: {
				limit: 20,
				curPage: 1
			},
    }
  },
	components: {
		pagination
	},
	computed:{
		total(){
			return this.userData.length;
		},
		userList(){
			return this.userData.filter((item, index) => {
				return index >= (this.paginationSetting.curPage - 1) * this.paginationSetting.limit && index < this.paginationSetting.curPage * this.paginationSetting.limit;
			})
		},
		customizeIndex(){
			return (this.paginationSetting.curPage - 1) * this.paginationSetting.limit + 1;
		}
	},
	created(){
		this.getUsersData_init();
	},
	methods:{
		//获取所有用户信息
		getUsersData_init(){
			getUsersData().then(res => {
				this.userData = res;
			})
		},
		checkPermission,
		//同步勾选项数据
		handleSelectionChange(rows){
			selectionRowDatas = rows;
		},
		toggleSelection(){
			if(selectionRowDatas.length === 0){
				this.warnMessageFun('请勾选后，再操作')
			}else{
				this.resetPasswords(selectionRowDatas);
			}
      //提交后格式化
			selectionRowDatas = [];
		
		},
		warnMessageFun(news){
			this.$message({
				message: news,
				type: 'warning'
			});
		},
		//重置所勾选的用户密码，并返回所有用户信息
		resetPasswords(selectionList){
			resetUserPassword(selectionList).then(res => {
				this.userData = res;
			})
		}
	}
}
</script>

<style lang="" scoped>
</style>
