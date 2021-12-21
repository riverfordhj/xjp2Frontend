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
			<el-tabs type="border-card" v-model="companyDataForms.activeName" @tab-click="getComInfoByBuildingName">
				<el-tab-pane label="企业信息" name="first">			
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
					<el-table :data="totalTaR" height="293" border style="width: 100%">
								<el-table-column prop="tRevenue" label="总体营收(万元)" width="120">
								</el-table-column>
								<el-table-column prop="tTax" label="总体税收(万元)" width="180">
								</el-table-column>
								<el-table-column prop="companyCount" label="总体企业数量" width="180">
								</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="营收排名前10名" >
					<el-table :data="countRevenue" height="293" border style="width: 100%">
								<el-table-column prop="companyName" label="企业名称" width="180">
								</el-table-column>
								<el-table-column prop="cRevenue" label="营收(万元)" width="180">
								</el-table-column>
					</el-table>
				</el-tab-pane>
				  <el-tab-pane label="纳税排名前10名" >
					<el-table :data="countTax" height="293" border style="width: 100%">
								<el-table-column prop="companyName" label="企业名称" width="180">
								</el-table-column>
								<el-table-column prop="cTax" label="税收(万元)" width="180">
								</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="产业分布" >
					<el-table :data="industryType" height="293" border style="width: 100%">
								<el-table-column prop="industryName" label="产业类型" width="180">
								</el-table-column>
								<el-table-column prop="industryCompanyCount" label="所属产业企业数" width="180">
								</el-table-column>
								<el-table-column prop="industryRevenue" label="产业营收(万元)" width="180">
								</el-table-column>
								<el-table-column prop="industryTax" label="产业税收(万元)" width="180">
								</el-table-column>
					</el-table>
				</el-tab-pane>
				<el-tab-pane label="营收分布" >
					<div height="293"  style="width: 100%">
						<barchart-revenue   :revenueRound = 'revenueRound'></barchart-revenue>
					</div>
				</el-tab-pane>
				<el-tab-pane label="税收分布" >
					<div height="293"  style="width: 100%">
						<barchart-tax  v-if="taxRound.length>0" :taxRound = 'taxRound'></barchart-tax>
					</div>
				</el-tab-pane>
			</el-tabs>
		</dialog-drag>
	</div>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';
import { getInfoByBuildingNameAndFloor,getRoomByBuilding,getCountTaxByBuilding,getCountRevenueByBuilding,
         getTotalTaRByBuilding,getIndustryTypeByBuilding, getTaxRoundByBuilding,getRevenueRoundByBuilding} from '@/api/company.js';
import filterPanel from './filterComponents/filterPanel.vue'
import barchartTax from './filterComponents/barchartTax.vue'
import barchartRevenue from './filterComponents/barchartRevenue.vue'
export default {
	name: 'companyInfoPanel',
	components: {
		DialogDrag,
		barchartTax,
		barchartRevenue,
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
			 buildingInfo:[],
			 countTax:null,
			 countRevenue:null,
			 industryType:null,
			 totalTaR:null,
			 taxRound:[],
			 revenueRound:[],
			 companyCount:null,
			//  activeName: 'first',
		}
	},
	computed:{
		companyInFloorTitle(){
			return '楼层入驻公司信息： ' + this.companyDataForms.title;
		},
		companyactiveName(){
			return this.companyDataForms.activeName;
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
			this.activeName = "first";
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
			const buildingName = this.companyDataForms.buildingName;
			console.log(buildingName);
		    //向后端请求 返回指定楼栋税收前十
			getCountTaxByBuilding(buildingName).then(res =>{
				this.countTax = res;
			}).catch(err => {
				console.log(err);
			});

			// //向后端请求 楼栋营收前十
			getCountRevenueByBuilding(buildingName).then(res =>{
				this.countRevenue = res;
			}).catch(err => {
				console.log(err);
			});

			// //向后端请求楼栋总税收、总营收
			getTotalTaRByBuilding(buildingName).then(res =>{
				this.totalTaR = res;
			}).catch(err => {
				console.log(err);
			});

			// //向后端请求产业分类及产业总营收、税收
			getIndustryTypeByBuilding(buildingName).then(res =>{
				this.industryType = res;
			}).catch(err => {
				console.log(err);
			});

			getRevenueRoundByBuilding(buildingName).then(res =>{
				 this.revenueRound = [];
				 if( this.revenueRound.length < 1){
					 Object.values(res[0]).map( val =>{
						 this.revenueRound.push(val);
					 })			 		      
				 }				
                  console.log(this.revenueRound);
			 }).catch(err => {
				console.log(err);
			    });

			 getTaxRoundByBuilding(buildingName).then(res =>{
				 this.taxRound = [];
				 if( this.taxRound.length < 1){				 
					Object.values(res[0]).map( val =>{
						this.taxRound.push(val);
					})				      
				 }
                 console.log(this.taxRound);
			 }).catch(err => {
				console.log(err);
			    });

			
		    },
		//定位到选定楼层
		flyToTarget (buildingName,curRoom){
			//定位飞行过程中，信息面板设为不可见
			this.companyDataForms.show = false;
			this.activeName = "first";
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