<template>
  <div class="pagination-container">
	 <el-pagination
	    :background="background"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum">
    </el-pagination>
	</div>
</template>

<script>
export default {
	name: 'pagination',
	props: {
		totalNum: {
			type: Number,
			required: true,
			default: 0
		},
		pageSizes: {
			type: Array,
			default(){
				return [200, 500, 1000, 2000];
			} 
		},
		page: {
			type: Number,
			default: 1
		},
		limit: {
			type: Number,
			default: 200
		}
	},
	data(){
		return {
			background: true
		}
	},
	computed: {
		pageSize: {
			get(){
				return this.limit;
			},
			set(val){
				this.$emit('update:limit', val);
			}
		},
		currentPage: {
			get(){
				return this.page;
			},
			set(val){
				this.$emit('update:page', val);
			}
		}
	},
	methods:{
		handleSizeChange(val){
			this.pageSize = val;
		},
		handleCurrentChange(curPage){
			this.currentPage = curPage;
		}
	}
}
</script>

<style scoped>
 .pagination-container{
	 float: right;
	 padding: 20px 45px;
 }
</style>