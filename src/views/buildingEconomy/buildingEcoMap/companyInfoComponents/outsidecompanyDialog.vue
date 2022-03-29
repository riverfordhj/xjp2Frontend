<template>
	<div v-show="outcompanyDataForms.show1">
		<dialog-drag
			id="dialog-1"
			class="dialog-3"
			:title="companyInFloorTitle"
			pinned="false"
			:options="option"
			@close="close"
		>
					<!-- <filter-panel ref="filterPanel" @firstSelectChange="getFloorInfos" @secondSelectChange="flyToTarget"></filter-panel> -->

					<el-table :data="outcompanyDataForms.OutsideCompanyinfo" height="250" border style="width: 100%">
								<el-table-column prop="companyName" label="企业名称" width="180">
								</el-table-column>
								<el-table-column prop="unifiedSocialCreditCode" label="统一社会信用代码" width="180">
								</el-table-column>
								<el-table-column prop="actualOfficeAddress" label="实际办公地址" width="180">
								</el-table-column>
                                <el-table-column prop="registeredAddress" label="注册地址" width="180">
								</el-table-column>
								<el-table-column prop="registeredCapital" label="注册资本(万元)" width="120">
								</el-table-column>
								<el-table-column prop="registeredTime" label="注册时间" width="120">
								</el-table-column>
								<el-table-column prop="isWhereBuild" label="是否在楼宇内" width="80">
								</el-table-column>
								<el-table-column prop="phone" label="联系电话" width="80">
								</el-table-column>
								<el-table-column prop="industryName" label="所属行业" width="180">							
								</el-table-column>
								<el-table-column prop="tax" label="税收(万元)" width="120">
								</el-table-column>
							
						
					</el-table>
		</dialog-drag>
	</div>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';
export default {
	name: 'outcompanyInfoPanel',
	components: {
		DialogDrag,
	},
	props: {
		// show1: {
		// 	type: Boolean,
		// 	default: false
		// },
        outcompanyinfo: {
            type: Object,
            default: function() {
                return {}
            }
        }
	},
	data(){
		return {
			option: { top: 250, left: 20, height: 420, width: 800, buttonPin: false },
			outcompanyDataForms: this.outcompanyinfo,
		}
	},
	computed:{
		companyInFloorTitle(){
			return '区外企业公司信息';
		},
	},
	watch:{

	},
     created(){
     },
	methods: {
		close (){
			// this.show1 = false;
			// console.log(this.outcompanyinfo.OutsideCompanyinfo);
			this.outcompanyinfo.show1 = false;
		},

	}
}
</script>
<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style scoped>
 .selectForm{
	 margin-top: -5px;
	 margin-bottom: 8px;
 }
</style>