<template>
	<div v-show="companyDataForms.show">
		<dialog-drag
      id="dialog-1"
      class="dialog-3"
      :title="companyInFloorTitle"
      pinned="false"
      :options="option"
      @close="close"
    >
			<filter-panel ref="filterPanel" @firstSelectChange="getFloorInfos" @secondSelectChange="flyToTarget"></filter-panel>

      <el-table :data="companyDataForms.companiesFullInfo" height="550" border style="width: 100%">
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

    </dialog-drag>
	</div>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';
import { getFloorInfoByBuilding} from '@/api/company.js';

import filterPanel from './filterComponents/filterPanel.vue'

export default {
	name: 'companyInfoPanel',
	components: {
		DialogDrag,
		filterPanel
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
			companyDataForms: this.companyDatas,
		}
	},
	computed:{
		companyInFloorTitle(){
			return '楼层入驻公司信息： ' + this.companyDataForms.title;
		}
	},
	watch:{
		"companyDatas.companiesFullInfo": function(){
			//清空子组件的状态
			this.$refs.filterPanel.clearFilterPanel();
		}
	},
	methods: {
		close (){
			this.companyDatas.show = false;
			//清空子组件的状态
			this.$refs.filterPanel.clearFilterPanel();
		},
		//获取指定楼栋的楼层信息
		getFloorInfos (curValue, buildingParam, FloorDataParam){
			const targetBuilding = buildingParam.find(item => item.buildingName === curValue);
			//向后端请求目标楼栋的楼层信息
			getFloorInfoByBuilding(targetBuilding.id).then(res => {
				FloorDataParam.FloorInfos = res[0].floor;
			}).catch(err => {
				console.log(err);
			})
		},
		//定位到选定楼层
		flyToTarget (curFloorNum, arr){
			const curFloorInfo = arr.find(item => item.floorNum === curFloorNum);
			debugger
			if(curFloorInfo){
				const position = {
					long: curFloorInfo.long,
					lat: curFloorInfo.lat,
					height: curFloorInfo.height
				};
				this.companyDatas.interactOperate.FlytoFloor(position, curFloorInfo.floorNum);
			}
		}
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