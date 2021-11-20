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

      <el-table :data="companyDataForms.companiesFullInfo" height="250" border style="width: 100%">
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
				<el-table-column prop="industryName" label="所属行业" width="180">
				</el-table-column>
				<el-table-column prop="registeredTime" label="注册时间" width="120">
				</el-table-column>
				<el-table-column prop="employeesNum" label="员工人数" width="80">
				</el-table-column>
				<el-table-column prop="bachelorAboveNum" label="本科及以上" width="80">
				</el-table-column>
				<el-table-column prop="patentNum" label="专利数" width="80">
				</el-table-column>
				<el-table-column prop="officeArea" label="办公室面积/m²" width="80">
				</el-table-column>
				<!-- <el-table-column prop="taxStatisticsArea" label="税收统计区" width="120">
				</el-table-column> -->
				<el-table-column prop="corporateTax" label="企业税收额（万元)" width="140"/>
				<el-table-column prop="floorNum" label="楼层" width="80"/>
				<el-table-column prop="officeSpaceType" label="用房类型" width="100"/>
      </el-table>

    </dialog-drag>
	</div>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';
import { getBuildingFloors,getInfoByBuildingNameAndFloor,getRoomByBuilding} from '@/api/company.js';

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
			option: { top: 250, left: 20, height: 350, width: 800, buttonPin: false },
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
		getFloorInfos (curValue, FloorDataParam){		
			//向后端请求目标楼栋的楼层信息
			getRoomByBuilding(curValue).then(res =>{
				FloorDataParam.roomName = res;
				console.log(FloorDataParam.roomName);
			}).catch(err => {
				console.log(err);
			})
		},
		//定位到选定楼层
		flyToTarget (buildingName,curRoom){
			//定位飞行过程中，信息面板设为不可见
			this.companyDataForms.show = false;
			getInfoByBuildingNameAndFloor(buildingName,curRoom).then( res =>{
				this.bus.$emit('deliveryPositionInfo', res[0], curRoom);
			})
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