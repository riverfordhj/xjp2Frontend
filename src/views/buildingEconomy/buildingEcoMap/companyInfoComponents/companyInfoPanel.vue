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
			<el-tabs type="border-card" @tab-click="getComInfoByBuildingName">
				<el-tab-pane label="企业信息">			
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
								<el-table-column prop="companyTax[2].revenue" label="2020营收(万元)" width="120">
								</el-table-column>
								<el-table-column prop="companyTax[2].tax" label="2020税收(万元)" width="120"/>
								<el-table-column prop="floorNum" label="楼层" width="80"/>
								<el-table-column prop="officeSpaceType" label="用房类型" width="100"/>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="楼宇信息" >
					<el-table :data="buildingInfo" height="293" border style="width: 100%">
								<el-table-column prop="buildingName" label="总体营收(万元)" width="120">
								</el-table-column>
								<el-table-column prop="companyName" label="总体税收(万元)" width="180">
								</el-table-column>
								<el-table-column prop="unifiedSocialCreditCode" label="总体企业数量" width="180">
								</el-table-column>
								<el-table-column prop="actualOfficeAddress" label="产业分布" width="180">
								</el-table-column>
								<el-table-column prop="unifiedSocialCreditCode" label="营收排名前10名" width="180">
								</el-table-column>
								<el-table-column prop="actualOfficeAddress" label="纳税排名前10名" width="180">
								</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</dialog-drag>
	</div>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';
import { getInfoByBuildingNameAndFloor,getRoomByBuilding} from '@/api/company.js';

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
			option: { top: 250, left: 20, height: 420, width: 800, buttonPin: false },
			companyDataForms: this.companyDatas,
			buildingInfo:[{buildingName: 'dasdad'}],
		}
	},
	computed:{
		companyInFloorTitle(){
			return '楼层入驻公司信息： ' + this.companyDataForms.title;
		},
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
		//获取楼宇信息 总营收 税收 产业分布 楼宇企业数
		getComInfoByBuildingName( ){
			console.log(this.companyDataForms.buildingName)

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