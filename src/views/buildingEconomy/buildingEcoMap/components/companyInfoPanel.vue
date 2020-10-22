<template>
	<div v-show="companyDataForms.show">
		<dialog-drag
      id="dialog-1"
      class="dialog-3"
      :title="cmtitle"
      pinned="false"
      :options="option"
      @close="close"
    >
      <!-- <el-scrollbar :native="false" style="height:100%, height: 100%"> -->
     
      <el-table :data="companyDataForms.compaiesFullInfo" height="600" border style="width: 100%">
				<el-table-column prop="buildingName" label="楼宇名称" width="120">
				</el-table-column>
				<el-table-column prop="companyName" label="企业名称" width="180">
				</el-table-column>
				<el-table-column prop="unifiedSocialCreditCode" label="统一社会信用代码" width="180">
				</el-table-column>
				<el-table-column prop="actualOfficeAddress" label="实际办公地址" width="180">
				</el-table-column>
				<el-table-column prop="registeredCapital" label="注册资本(万元)" width="120">
				</el-table-column>
				<el-table-column prop="legalRepresentative" label="公司法人代表" width="140">
				</el-table-column>
				<el-table-column prop="contacts" label="联系人" width="80">
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" width="80">
				</el-table-column>
				<el-table-column prop="businessDirection" label="企业主营方向" width="220">
				</el-table-column>
				<el-table-column prop="registeredAddress" label="工商注册登记地" width="180">
				</el-table-column>
				<el-table-column prop="taxStatisticsArea" label="税收统计区" width="120">
				</el-table-column>
				<el-table-column prop="corporateTax" label="企业税收额（万元)" width="140"/>
				<el-table-column prop="floor" label="楼层" width="80"/>
				<el-table-column prop="category" label="租赁/购买" width="100"/>
   
     
      </el-table>
    <!-- </el-scrollbar> -->
    </dialog-drag>
	</div>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';


export default {
	name: 'companyInfoPanel',
	components: {
    DialogDrag
	},
	props: {
		companyDatas: {
      type: Object,
      default: function() {
        return {}
      }
    }
	},
	data(){
		return {
			option: { top: 250, left: 20, height: 650, width: 1200, buttonPin: false },
			companyDataForms: this.companyDatas
		}
	},
	computed:{
		cmtitle(){
			return this.companyDataForms.compaiesFullInfo.buildingName + this.companyDataForms.compaiesFullInfo.floor;
		}
	},
	methods: {
		close() {
      this.companyDatas.show = false
    },
	}
}
</script>
<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>
<style src="vue-dialog-drag/dist/dialog-styles.css"></style>

<style>

</style>