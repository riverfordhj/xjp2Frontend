<template>
	<div class="login_updatePassword passwordContainer">
		<el-card>
		  <el-form label-width="120px">
			  <h3 class="title">自定义用户分配API</h3>
				<el-form-item label="用户名">
						<el-input placeholder="请输入用户名"  v-model="ah"></el-input>
				</el-form-item>
				<el-form-item label="自定义分配API">
						<el-tree
						:data="data"
						show-checkbox
						node-key="id"
						ref="tree"
						highlight-current
						:props="defaultProps">
						</el-tree>
				</el-form-item>
				
				<el-form-item label="批量分配API">
						<el-button size="mini" @click="netGrid">网格员</el-button>
						<el-button size="mini" @click="community">社区</el-button>
						<el-button size="mini" @click="street">街道</el-button>
				</el-form-item>

				<div class="button-container"> 
						<el-button type="primary" @click="onSubmit">提交</el-button>
						<el-button @click="resetChecked">取消</el-button>
				</div>
			</el-form>
		</el-card>
	</div>
</template>

<script>
  export default {
    methods: {
      netGrid() {
        this.$refs.tree.setCheckedNodes([{
            id: 11,
            label: '人员查询',
					},{
						id: 12,
						label: '房屋查询',
					},{
						id: 13,
						label: '楼栋查询',
					},{
            id: 21,
            label: '数据录入',
					},{
						id: 22,
						label: '数据修改',
					},{
						id: 23,
						label: '数据删除',
					},{
						id: 24,
						label: '数据提交',
					},{
            id: 31,
            label: '历史数据管理',
					},{
            id: 41,
            label: '密码修改',						
        }]);
      },

		community(){
			this.$refs.tree.setCheckedNodes([{
            id: 11,
            label: '人员查询',
					},{
						id: 12,
						label: '房屋查询',
					},{
						id: 13,
						label: '楼栋查询',
					},{
						id: 14,
						label: '网格查询',
					},{
            id: 31,
            label: '历史数据管理',
					},{
						id: 32,
						label: '社区审核',
					},{
            id: 41,
            label: '密码修改',
					},{
						id: 42,
						label: '网格员管理',
					},{
            id: 51,
            label: '楼栋人员中文信息',
					},{
						id: 52,
						label: '网格人员中文信息',
					}]);
		},

		street(){
			this.$refs.tree.setCheckedNodes([{
            id: 11,
            label: '人员查询',
					},{
						id: 12,
						label: '房屋查询',
					},{
						id: 13,
						label: '楼栋查询',
					},{
						id: 14,
						label: '网格查询',
					},{
						id: 15,
						label: '社区查询',
					},{
						id: 25,
						label: '房屋管理',
          },{
            id: 31,
            label: '历史数据管理',
					},{
						id: 33,
						label: '街道批准',
					},{
            id: 41,
            label: '密码修改',
					},{
						id: 43,
						label: '创建用户分配权限',
					},{
						id: 44,
						label: '重置密码',
					},{
						id: 45,
						label: '自定义特殊角色分配Api',
          },{
            id: 51,
            label: '楼栋人员中文信息',
					},{
						id: 52,
						label: '网格人员中文信息',
					}]);
		},

      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
					this.$message({
							message: "已取消！",
							type: 'success'
						});
      },

			onSubmit(){
        this.$refs.tree.setCheckedKeys([]);
					this.$message({
							message: "已提交！",
							type: 'success'
						});
			}
    },

	data(){
		return{
			data: [{
          id: 1,
          label: '数据查询Api',
          children: [{
            id: 11,
            label: '人员查询',
					},{
						id: 12,
						label: '房屋查询',
					},{
						id: 13,
						label: '楼栋查询',
					},{
						id: 14,
						label: '网格查询',
					},{
						id: 15,
						label: '社区查询',
					}]
        }, {
          id: 2,
          label: '数据维护Api',
					children: [{
            id: 21,
            label: '数据录入',
					},{
						id: 22,
						label: '数据修改',
					},{
						id: 23,
						label: '数据删除',
					},{
						id: 24,
						label: '数据提交',
					},{
						id: 25,
						label: '房屋管理',
          }]
        }, {
          id: 3,
          label: '数据审批Api',
					children: [{
            id: 31,
            label: '历史数据管理',
					},{
						id: 32,
						label: '社区审核',
					},{
						id: 33,
						label: '街道批准',
					}]
        }, {
          id: 4,
          label: '安全管理Api',
					children: [{
            id: 41,
            label: '密码修改',
					},{
						id: 42,
						label: '网格员管理',
					},{
						id: 43,
						label: '创建用户分配权限',
					},{
						id: 44,
						label: '重置密码',
					},{
						id: 45,
						label: '自定义特殊角色分配Api',
          }]
        }, {
          id: 5,
          label: '统计分析Api',
					children: [{
            id: 51,
            label: '楼栋人员中文信息',
					},{
						id: 52,
						label: '网格人员中文信息',
					}]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
				ah:''
      };
    }
  };
</script>

<style scoped>
.passwordContainer{
	position: absolute;
	top: 40%;
	left: 50%;
}
.title {
  text-align: center;
}
.button-container{
	display: flex;
	justify-content: center;
}
</style>