<template>
	<div class="container">
		<div class="toolbar">
			<el-button 
				v-if="userName === 'saxc1'"
				type="primary" 
				icon="el-icon-edit"
				@click="dialogVisibleForCreating = true"
		  >
				新建
			</el-button>
			<el-radio-group v-model="exchangeValue" @change="radioExchange">
				<el-radio-button label="人房数据"></el-radio-button>
				<el-radio-button label="在编辑数据"></el-radio-button>
			</el-radio-group>
			<div class="filterBar" v-if="exchangeValue != '人房数据'">
				<el-select v-model="operationValue" clearable placeholder="全部" @change="selectStatus">
					<el-option
						v-for="item in statusOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
	
		<el-table
			:data="personHouseInfo" 
			height="920" 
			border
			class="personHouseTable"	
			style="width: 100%"
		>
			<el-table-column 	align="center" type="index"	width="80" label="ID">
			</el-table-column>
			<el-table-column align="center" label="身份证" width="180">
						<template slot-scope="{row}">
							<span>{{ row.personId }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="姓名" width="120">
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.name" class="edit-input" size="small" clearable/>
							<span v-else>{{ row.name }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" width="180px"  label="电话" >
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.phone" class="edit-input" size="small" clearable/>
							<span v-else>{{row.phone}}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="是否为户主" width="120">
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.isHouseholder" class="edit-input" size="small" clearable/>
							<span v-else>{{ row.isHouseholder }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="与户主的关系" width="120">
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.relationWithHouseholder" class="edit-input" size="small" clearable/>
							<span v-else>{{ row.relationWithHouseholder }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="人口性质" width="120">
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.populationCharacter" class="edit-input" size="small" clearable/>
							<span v-else>{{ row.populationCharacter }}</span>
						</template>
			</el-table-column>

		
			<el-table-column align="center" label="房屋性质" width="120">
						<template slot-scope="{row}">
							<el-input v-if="row.edit" v-model="row.category" class="edit-input" size="small" clearable/>
							<span v-else>{{ row.category }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="房间名" width="120">
						<template slot-scope="{row}">
							<span>{{ row.roomName }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="所属楼栋" width="220">
						<template slot-scope="{row}">
							<span>{{ `${row.communityName}-网格${row.netGrid}-${row.buildingName}栋` }}</span>
						</template>
			</el-table-column>
			
		
			<el-table-column  v-if="userName === 'saxc1'" align="center" label="编辑" width="180">
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
							@click="row.edit=!row.edit"
						>
							修改
						</el-button>
					</el-button-group>
					<el-button-group v-else-if="row.edit">
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
      
			<el-table-column v-if="userName === 'saxc'" align="center" label="编辑" width="220">
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

			<el-table-column v-if="userName === 'admin'" align="center" label="编辑" width="220">
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

		<create-new-person-house 
			:dialog-visible-for-creating="dialogVisibleForCreating" 
			:person-house-info="personHouseInfo" 
			@createPersonHouse="handleCreate" 
			@closeCreatePanel="dialogVisibleForCreating = $event"
		>
		</create-new-person-house>
	
	</div>
</template>

<script>

import { GetPersonHouseInfoByUser, 
				 updatePersonHouseByNetGrid, 
				 VerifyByCommunity, 
				 ConfirmByAdmin,
				 SearchPersonHouseByNetGrid } from '@/api/person.js';

import { deepClone } from '@/utils/tools.js'
import createNewPersonHouse from './components/createNewPersonHouse.vue';

export default {
	name: 'nanage-personHouse',
	data(){
		return {
			personHouseInfo: [],
			userName: '',
		
			// rolesObj: ['网格员', '水岸星城', 'Administrator'],
			
			exchangeValue: '人房数据',
			operationValue: '',
			statusOptions: [
				{
          value: 'all',
          label: '全部'
				},{
          value: 'creating',
          label: '新建'
				},{
          value: 'updating',
          label: '修改'
        },{
          value: 'deleting',
          label: '删除'
        }
			],
			tempPersonHouseEditInfo: [],

			dialogVisibleForCreating: false,
		}
	},
	components: {
		createNewPersonHouse
	},
	created(){
		this.getUserName();
		this.getPersonHouseInfo();
	},
	methods:{
		//请求人房信息
		getPersonHouseInfo (){
			GetPersonHouseInfoByUser().then((res) => {
				this.handlePersonHouseInfo(res);
			}).catch(err => {
				console.log(err);
			})
		},
		//切换“人房数据”和“人房在编辑数据”
		radioExchange(value){
			if(value === "人房数据"){
				this.getPersonHouseInfo();
			}else{
				//请求人房的历史编辑数据（网格员）
				SearchPersonHouseByNetGrid().then(res => {
					this.handlePersonHouseInfo(res);
					this.tempPersonHouseEditInfo = deepClone(this.personHouseInfo, []);
				}).catch(err => {
					console.log(err);
				})
			}
		},
		//根据编辑状态过滤历史编辑数据
		selectStatus(operationVal){
			if(operationVal != "all"){
				this.personHouseInfo = this.tempPersonHouseEditInfo.filter((item, index) => {
					return item.operation === operationVal;
				})
			}else{
				this.personHouseInfo = this.tempPersonHouseEditInfo;
			}
		},
		//为每条信息（对象）添加新属性
		handlePersonHouseInfo (data){
			this.personHouseInfo = data.map(item => {
				if(this.userName === 'saxc1'){
					item.edit = false;//edit: 控制修改部件的显示
				}
				return item;
			})
		},
		
		//(网格员)对人房数据的增、删、改
		updatePersonHouseInfo(data){
			updatePersonHouseByNetGrid(data).then(res => {
				this.handlePersonHouseInfo(res);
			}).catch(err => {
				console.log(err);
			});
		},
		//（网格员）提交“新建”
		async handleCreate(newVal){
			await this.updatePersonHouseInfo(newVal);
			this.dialogVisibleForCreating = false;
		},
		//（网格员）提交“删除”
		handleDelete(row){
			row.status = 'committed';
			row.operation = 'deleting';
			this.updatePersonHouseInfo(row);
		},
		//（网格员）提交“更新”
		handleUpdate (row){
			row.edit = !row.edit;
			row.status = 'committed';
			row.operation = 'updating';
			this.updatePersonHouseInfo(row);
		},
		//取消更新
		cancelUpdate (row) {
			row.edit = false;
			//重新请求人房信息
			this.getPersonHouseInfo();
		},
		//社区审核未通过时，使得状态重置为null
		clickForReseting(row){
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
			debugger;
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

		//获取登录名
		getUserName (){
			this.userName = this.$store.getters.name;
		},

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

	.filterBar{
		display: inline-block;
	}

	.personHouseTable >>> div.cell,
	.personHouseTable >>> div.cell input{
    padding: 0 3px
	}

	.cancel-btn{
		margin-right: 5px;
	}
</style>