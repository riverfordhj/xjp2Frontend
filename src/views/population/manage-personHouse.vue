<template>
	<div class="container">
		<div class="toolbar">
			<el-button 
			  class="create-button"
				v-if="checkPermission('网格员')"
				type="primary" 
				icon="el-icon-edit"
				@click="dialogVisibleForCreating = true"
		  >
				新建
			</el-button>
			<upload-excel :standard-header="tableHeaderForXlsx" :standard-header-en="filterValForXlsx" label-name="批处理新建"></upload-excel>
			<el-radio-group class="radio-exchange" v-model="exchangeValue" @change="radioExchange">
				<el-radio-button label="人房数据"></el-radio-button>
				<el-radio-button label="历史数据"></el-radio-button>
			</el-radio-group>

			<!-- 历史数据的过滤栏 -->
			<history-filter-panel
			  v-if="exchangeValue != '人房数据' && checkPermission('网格员')" 
				@operationChange="selectOperation" 
				@statusChange="selectStatus" 
				@timePicked="selectTimeRange" 
				@reset="resetFilterData">
			</history-filter-panel>

  
      <!-- 导出数据为xlsx格式表格 -->
			<div class="exportContainer">
				<export-to-xlsx :multi-header="multiHeaderForXlsx" :merges-setting="mergesSetting" :table-header="tableHeaderForXlsx" 
												:filter-fields="filterValForXlsx" :person-house-data="personHouseList" label-name="导出当前">
				</export-to-xlsx>
				<export-to-xlsx :multi-header="multiHeaderForXlsx" :merges-setting="mergesSetting" :table-header="tableHeaderForXlsx" 
												:filter-fields="filterValForXlsx" :person-house-data="personHouseInfo" label-name="导出全部">
				</export-to-xlsx>
			</div>
			    <!-- 人房数据的过滤栏 -->
			<div class="pr-filterbar" v-if="checkPermission('网格员')">
				<filter-panel @transferBuildingAndRoom="filterPersonHouseInfo"></filter-panel>
			</div>
		</div>
	
		<el-table
			:data="personHouseList" 
			height="835" 
			border
			class="personHouseTable"	
			style="width: 100%"
		>
			 <el-table-column align="center" type="index" :index="customizeIndex"	width="50" label="ID" fixed="left">
			</el-table-column>
			<el-table-column align="center" label="身份证号" width="170" fixed="left">
						<template slot-scope="{row}">
							<span>{{ row.personId }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="姓名" width="90" fixed="left">
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.name" class="edit-input" size="small" clearable/>
							<span v-else>{{ row.name }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="120px"  label="联系方式" >
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.phone" class="edit-input" size="small" clearable/>
							<span v-else>{{row.phone}}</span>
						</template>
			</el-table-column>

			<el-table-column align="center" width="80px"  label="民族" >
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.ethnicGroups" class="edit-input" size="small" clearable/>
							<span v-else>{{row.ethnicGroups}}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="100px"  label="户籍地址" >
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.domicileAddress" class="edit-input" size="small" clearable/>
							<span v-else>{{row.domicileAddress}}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="100px"  label="从业单位" >
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.company" class="edit-input" size="small" clearable/>
							<span v-else>{{row.company}}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="90px"  label="政治面貌" >
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.politicalState" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.politicalStatuArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{row.politicalState}}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="80px"  label="组织关系" >
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.organizationalRelation" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.organizationalRelationArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{row.organizationalRelation}}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="80px"  label="是否侨胞" >
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.isOverseasChinese" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{row.isOverseasChinese}}</span>
						</template>
			</el-table-column>
				<el-table-column align="center" width="80px"  label="婚姻状况" >
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.merriedStatus" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.merriedStatusArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{row.merriedStatus}}</span>
						</template>
			</el-table-column>


			<el-table-column align="center" label="是否为户主" width="90">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.isHouseholder" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.isHouseholder }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="与户主关系" width="100">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.relationWithHouseholder" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.relationWithHouseholderArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.relationWithHouseholder }}</span>
						</template>
			</el-table-column>
				<el-table-column align="center" label="是否为产权人" width="100">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.isOwner" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.isOwner }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="是否在此居住" width="100">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.isLiveHere" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.isLiveHere }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="人口性质" width="90">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.populationCharacter" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.populationCharacterArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.populationCharacter }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="寄住原因" width="120">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.lodgingReason" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.LodgingReasonArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.lodgingReason }}</span>
						</template>
			</el-table-column>

		
			<el-table-column align="center" label="房屋类别" width="120">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.category" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.categoryValueArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.category }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="房屋用途" width="80">
						<template slot-scope="{row}">
							<el-select v-if="row.edit" v-model="row.roomUse" size="small" placeholder="请选择">
								<el-option v-for="item in personRoomDataOptions.roomUseArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
							<span v-else>{{ row.roomUse }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="房间名" width="80">
						<template slot-scope="{row}">
							<span>{{ row.roomName }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="面积m²" width="80">
						<template slot-scope="{row}">
							<span>{{ row.area }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="所属楼栋" width="160">
						<template slot-scope="{row}">
							<span>{{ `${row.communityName}-网格${row.netGrid}-${row.buildingName}栋` }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="地址" width="120">
						<template slot-scope="{row}">
							<span>{{ row.address }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="其他" width="80">
						<template slot-scope="{row}">
							<span>{{ row.other }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="所属小区" width="80">
						<template slot-scope="{row}">
							<span>{{ row.subdivisionName }}</span>
						</template>
			</el-table-column>
			
		
			<el-table-column  v-if="checkPermission('网格员')" align="center" label="编辑" width="170" fixed="right">
				<template slot-scope="{row}">
					<el-button-group v-if="row.edit === false && row.status === null">
						<el-button
							type="warning"
							size="small"
							icon="el-icon-delete" 
							@click="handleDelete(row)"
						>
							删除
						</el-button>
						<el-button
							type="primary"
							size="small"
							icon="el-icon-edit"
							@click="row.edit = true"
						>
							修改
						</el-button>
					</el-button-group>
					<el-button-group v-else-if="row.edit === true">
						<el-button
							class="cancel-btn"
							size="small"
							type="warning"
							@click="cancelUpdate(row)"
						>
							取消
						</el-button>
						<el-button
							type="success"
							size="small"
							@click="handleUpdate(row)"
						>
							提交
						</el-button>
					</el-button-group>
					<el-button
						v-else-if="waitingForVerify(row)"
						:type="row.status === 'failed'? 'primary' : 'info'"
						size="small"
						:disabled="row.status === 'failed'? false: true"
						@click="clickForReseting(row)"
					>
						{{netGridStatusMap(row.status)}}
					</el-button>
				</template>
			</el-table-column>
      
			<el-table-column v-if="checkPermission('社区')" align="center" label="编辑" width="220" fixed="right">
				<template  slot-scope="{row}">
					<el-button
						v-if="waitingForConfirm(row)"
						:type="row.status === 'rejected'? 'primary' : 'info'"
						size="small"
						:disabled="row.status === 'rejected'? false: true"
						@click="verifyEdit(row, 'failed')"
					>
						{{communityStatusMap(row.status)}}
					</el-button>
					<el-button-group v-else-if="waitingForVerify(row)">
						<el-button 
							type="success"
							size="small"
							@click="verifyEdit(row, 'verified')"
						>
							审核通过
						</el-button>
						<el-button 
							type="warning"
							size="small"
							@click="verifyEdit(row, 'failed')"
						>
							不予通过
						</el-button>
					</el-button-group>
					
				</template>
			</el-table-column>

			<el-table-column v-if="checkPermission('Administrator')" align="center" label="编辑" width="220" fixed="right">
				<template  slot-scope="{row}">
					<el-button
						v-if="statusWithAdmin(row.status)"
						type="info"
						size="small"
						disabled
					>
						{{adminStatusMap(row.status)}}
					</el-button>
					<el-button-group v-else-if="waitingForConfirm(row)">
						<el-button 
							type="success"
							size="small"
							@click="confirmEdit(row, 'approved')"
						>
							批准
						</el-button>
							<el-button 
							type="warning"
							size="small"
							@click="confirmEdit(row, 'rejected')"
						>
							不予批准
						</el-button>
					</el-button-group>
				</template>
			</el-table-column>
		</el-table>
    <!-- 新建 -->
		<create-new-person-house 
			:dialog-visible-for-creating="dialogVisibleForCreating" 
			:records-obj="recordsObj"
			@createPersonHouse="getPersonHouseByExchangeValue" 
			@closeCreatePanel="dialogVisibleForCreating = $event"
		>
		</create-new-person-house>
    <!-- 分页显示 -->
		<pagination :total-num="total" :page.sync="paginationSetting.curPage" :limit.sync="paginationSetting.limit" ></pagination>
	
	</div>
</template>

<script>

import { GetPersonHouseInfoByUser, 
				 updatePersonHouseByNetGrid,
				 updatePersonHouseByNetGrid_void, 
				 VerifyByCommunity, 
				 ConfirmByAdmin,
				 SearchPersonHouseByNetGrid } from '@/api/person.js';

import { deepClone } from '@/utils/tools.js';
import checkPermission from '@/utils/permission.js';//权限判断函数

import createNewPersonHouse from './components/createNewPersonHouse.vue';
import historyFilterPanel from './components/historyFilterPanel.vue';
import pagination from './components/pagination.vue';
import exportToXlsx from './components/exportToXlsx';
import filterPanel from './components/filterPanel.vue';
import uploadExcel from './components/uploadExcel.vue';

import personRoomDataOptions from '@/assets/json/personRoomDataOptions.json';

export default {
	name: 'manage-personHouse',
	data(){
		return {
			personHouseInfo: [],
			tempPersonHouseInfo: [],//人房数据的副本，用作人房数据过滤。
			// rolesObj: ['网格员', '水岸星城', 'Administrator'],
			
			exchangeValue: '人房数据',
			
			tempPersonHouseEditInfo: [],

			dialogVisibleForCreating: false,

			//记录登录的网格员所属的网格和社区
			recordsObj: {
				netGridName: '',
				communityName: '',
			},
			
			//xlsx表配置项（表头、数据）
			multiHeaderForXlsx: [['房屋信息','','','','','','','','','','','单位信息','','','','','','','人员信息','','','','','','','','','','','','','','','']],
			tableHeaderForXlsx: ['所属社区','所属网格','地址','所属小区','楼栋名','单元号','房号','房屋类别','房屋用途','其他','面积m²','','','','','','','','姓名', '民族','身份证','联系方式', '户籍地址','是否为户主','与户主的关系','是否为产权人','是否在此居住',
													'从业单位','政治面貌','组织关系','是否侨胞','婚姻状况','人口性质','寄住原因'],
			mergesSetting: ['A1:K1','L1:R1','S1:AH1'],
			filterValForXlsx: ['communityName','netGrid','address','subdivisionName','buildingName','单元号','房号','category','roomUse','other','area','','','','','','','','name', 'ethnicGroups','personId','phone','domicileAddress','isHouseholder','relationWithHouseholder','isOwner','isLiveHere',
												'company','politicalState','organizationalRelation','isOverseasChinese','merriedStatus','populationCharacter','lodgingReason'],
			
			//分页默认配置
			paginationSetting: {
				limit: 20,
				curPage: 1
			},

      personRoomDataOptions,
		}
	},
	components: {
		createNewPersonHouse,
		historyFilterPanel,
		pagination,
		exportToXlsx,
		filterPanel,
		uploadExcel
	},
	created(){
		this.getPersonHouseInfo();
	},
	computed:{
		total(){
			return this.personHouseInfo.length;
		},
		personHouseList(){
			return this.personHouseInfo.filter((item, index) => {
				return index >= (this.paginationSetting.curPage - 1) * this.paginationSetting.limit && index < this.paginationSetting.curPage * this.paginationSetting.limit;
			})
		},
		customizeIndex(){
			return (this.paginationSetting.curPage - 1) * this.paginationSetting.limit + 1;
		}
	},
	methods:{
		//请求人房信息
		getPersonHouseInfo (){
			GetPersonHouseInfoByUser().then((res) => {
				this.handlePersonHouseInfo(res);
				this.recordsObj.netGridName = res[0].netGrid;
				this.recordsObj.communityName = res[0].communityName;
			}).catch(err => {
				console.log(err);
			})
		},
		//根据条件（楼栋、房间）过滤人房数据
		filterPersonHouseInfo(dataInfo){
			debugger;
			if(dataInfo.currentRoomName !== '' && dataInfo.currentBuildingName !== ''){
				this.personHouseInfo = this.tempPersonHouseInfo.filter((item) => {
					return item.buildingName === dataInfo.currentBuildingName && item.roomName === dataInfo.currentRoomName;
				})
			}else if(dataInfo.currentRoomName === '' && dataInfo.currentBuildingName !== ''){
				this.personHouseInfo = this.tempPersonHouseInfo.filter((item) => {
					return item.buildingName === dataInfo.currentBuildingName;
				})
			}else {
				this.personHouseInfo = this.tempPersonHouseInfo;
			}
			this.resetPaginationSetting();
		},
		//为每条信息（对象）添加新属性
		handlePersonHouseInfo (data){
			this.personHouseInfo = data.map(item => {
				if(this.checkPermission('网格员')){
					item.edit = false;//edit: 控制修改部件的显示
				}
				return item;
			});
			this.tempPersonHouseInfo = deepClone(this.personHouseInfo, []);//返回一个深度克隆的副本
		},

		//切换“人房数据”和“人房在编辑数据”
		async radioExchange(value){
			if(value === "人房数据"){
				await this.getPersonHouseInfo();
			}else{
				await this.getHistoryDataByNetGrid();
			}
			//每次切换数据时，重置queryList
			this.resetPaginationSetting();
		},
		getHistoryDataByNetGrid(){
			//请求人房的历史编辑数据（网格员）
			SearchPersonHouseByNetGrid().then(res => {
				this.handlePersonHouseInfo(res);
				this.tempPersonHouseEditInfo = deepClone(this.personHouseInfo, []);//返回一个深度克隆副本
			}).catch(err => {
				console.log(err);
			})
		},
		//历史数据的过滤工具函数
		filterToolFun(key, value){
			this.personHouseInfo = this.tempPersonHouseEditInfo.filter((item, index) => {
				return item[key] === value;
			});
			this.resetPaginationSetting();
		},
		//根据编辑类型过滤历史编辑数据（针对网格员）
		selectOperation(operationVal){
			this.filterToolFun('operation', operationVal);
		},
		//根据状态过滤历史编辑数据（针对网格员）
		selectStatus(statusVal){
			this.filterToolFun('status', statusVal);
		},
		//根据编辑时间过滤历史编辑数据（针对网格员）
		selectTimeRange(startTime, endTime){
			this.personHouseInfo = this.tempPersonHouseEditInfo.filter((item, index) => {
				let editTime = new Date(item.editTime).getTime(); 
				return editTime >= startTime && editTime <= endTime;
			});
			this.resetPaginationSetting();
		},
		//重置：显示所有历史编辑数据
		resetFilterData(){
			this.personHouseInfo = this.tempPersonHouseEditInfo;
			this.resetPaginationSetting();
		},
		//重置queryList为默认值
		resetPaginationSetting(){
			this.paginationSetting = {
				limit: 20,
				curPage: 1
			}
		},
		//（网格员）提交操作（对人房数据的增、删、改）
		async getPersonHouseByExchangeValue(newFormData){
			let isSuccess = true ;
			//根据radio按钮状态，请求后端方法
			if(this.exchangeValue === "人房数据"){
		    await updatePersonHouseByNetGrid(newFormData).then(res => {
								this.handlePersonHouseInfo(res);
							}).catch(err => {isSuccess = false; console.log(err);});
				this.editedOrNot(isSuccess);
			}else{
				await updatePersonHouseByNetGrid_void(newFormData).catch(err => {isSuccess = false; console.log(err);});
				await this.getHistoryDataByNetGrid();
				this.editedOrNot(isSuccess);
			}
		},
		//编辑消息提示
		editedOrNot(keyValue){
			if(keyValue){
				this.$message({
					message: '编辑成功',
					type: 'success'
				});
			}else{
				this.$message.error('编辑失败');
			}
		},
		//（网格员）提交“删除”
		handleDelete(row){
			row.status = 'committed';
			row.operation = 'deleting';
			this.getPersonHouseByExchangeValue(row);
		},
		//（网格员）提交“更新”
		async handleUpdate (row){
			row.status = 'committed';
			row.operation = 'updating';
			await this.getPersonHouseByExchangeValue(row);
		},
		//取消更新
		async cancelUpdate (row) {
			//重新请求人房信息
			if(this.exchangeValue === "人房数据"){
				await this.getPersonHouseInfo();
			}else{
				await this.getHistoryDataByNetGrid();
			}
			row.status = row.tempStatus;
		},
		//社区审核未通过时，将状态暂设为null
		clickForReseting(row){
			row.tempStatus = row.status;//为再编辑前的status（值为failed）创建一个副本，
			row.status = null;
		},
		
		//一个用于构造参数的工具函数
		paramsFun(row, statusVal){
			row.status = statusVal;
			return {
				personId : row.personId,
				status : row.status,
				RoomName : row.roomName,
				BuildingName : row.buildingName,
				NetGrid : row.netGrid,
				CommunityName : row.communityName
			};
		},
		//(社区)审核修改
		verifyEdit (row, statusVal){
			let pramasObj = this.paramsFun(row, statusVal);
			VerifyByCommunity(pramasObj).catch(err => {
				console.log(err);
			})
		},
		//（admin：街道）批准修改
		confirmEdit (row, statusVal){	
			let pramasObj = this.paramsFun(row, statusVal);
			ConfirmByAdmin(pramasObj).then(res => {
				this.handlePersonHouseInfo(res);
			}).catch(err => {
				console.log(err);
			})
		},

		checkPermission,//权限判断函数

		//当status属性不为nul，表明当前行数据处于修改之后
		waitingForVerify(row){
			return row.status != null;
		},
		//当status属性为verified时，表明当前行数据处于审核之后，批准之前
		waitingForConfirm(row){
			return row.status === 'verified' || row.status === 'failed' || row.status === 'rejected';
		},
		statusWithAdmin(statusVal){
			return statusVal === 'rejected' || statusVal === 'approved';
		},

		netGridStatusMap(statusVal){
			switch(statusVal){
				case 'committed':
					return '待审核';
				case 'failed':
					return '未通过审核, 点击修改';
				case 'verified':
					return '审核通过，待批准'
			}
		},
		//社区显示数据状态映射
		communityStatusMap(statusVal){
			switch(statusVal){
				case 'verified':
					return '待批准';
				case 'failed':
					return '已驳回';
				case 'rejected':
					return '未通过批准, 点击驳回'
			}
		},
		//街道显示数据状态映射
		adminStatusMap(statusVal){
			switch(statusVal){
				case 'approved':
					return '已批准';
				case 'rejected':
					return '已驳回';
			}
		}
	}
}
</script>

<style scoped>
	.toolbar{
		margin: 5px;
	}
  /* .create-button{
		display: inline-block;
	} */
	.personHouseTable >>> div.cell,
	.personHouseTable >>> div.cell input{
    padding: 0 3px
	}

	.cancel-btn{
		margin-right: 5px;
	}

	.pr-filterbar{
		float: right;
	}

	.exportContainer{
		float: right;
		padding-right: 10px;
		padding-left: 10px;
	}

	.create-button{
		padding-left: 15px;
		padding-right: 15px;
	}

	.radio-exchange >>> span{
		padding-left: 15px;
		padding-right: 15px;
	}
</style>