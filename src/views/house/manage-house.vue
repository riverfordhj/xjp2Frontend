<template>
  <div class="container">
		<div class="toolbar" >

		</div>
		<el-table
	    ref="multipleTable"
			:data="houseData" 
			height="835" 
			border
			class="HouseInfoTable"	
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column align="center" type="index" :index="customizeIndex"	width="50" label="ID" fixed="left">
			</el-table-column>
		</el-table>

		 <!-- 分页显示 -->
		<pagination 
			:total-num="total" 
			:page.sync="paginationSetting.curPage" 
			:limit.sync="paginationSetting.limit" 
		>
		</pagination>
  </div>
</template>

<script>
	import pagination from '../../components/pagination.vue';

  export default {
    name: 'manage-house',
    data() {
      return {
        houseData: [],

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
		computed: {
			total() {
				return this.houseData.length;
			}
		}
  }
</script>

<style lang="" scoped>
  
</style>