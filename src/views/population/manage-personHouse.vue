<template>
	<div class="container">
		<el-table
			:data="personHouseInfo" 
			height="920" 
			border	
			style="width: 100%"
		>
			<el-table-column align="center" label="ID" width="80">
						<template slot-scope="{row}">
							<span>{{ row.person.id }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="身份证" width="120">
						<template slot-scope="{row}">
							<span>{{ row.person.personId }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="姓名" width="120">
						<template slot-scope="{row}">
							<span>{{ row.person.name }}</span>
						</template>
			</el-table-column>
		
			
			<el-table-column align="center" label="房间名" width="180">
						<template slot-scope="{row}">
							<span>{{ row.roomName }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="房屋性质" width="180">
						<template slot-scope="{row}">
							<span>{{ row.roomCategory }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="所属楼栋" width="180">
						<template slot-scope="{row}">
							<span>{{ row.buildingName }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="所属网格" width="80">
						<template slot-scope="{row}">
							<span>{{ row.netGrid }}</span>
						</template>
			</el-table-column>
			<el-table-column align="center" label="所属社区" width="180">
						<template slot-scope="{row}">
							<span>{{ row.communityName }}</span>
						</template>
			</el-table-column>
			<el-table-column min-width="180px"  label="电话" >
						<template slot-scope="{row}">
							<template v-if="row.edit">
								<el-input v-model="row.person.phone" class="edit-input" size="small" />
								<el-button
									class="cancel-btn"
									size="small"
									icon="el-icon-refresh"
									type="warning"
									@click="cancelEdit(row)"
								>
									取消
								</el-button>
							</template>
							<span v-else>{{row.person.status != null ? row.person.editingPhone : row.person.phone}}</span>
						</template>
			</el-table-column>

			<el-table-column  v-if="userName === 'saxc1'" align="center" label="编辑" width="220">
				<template slot-scope="{row}">
					<el-button-group v-if="row.edit === false && row.person.status === null">
						<el-button
							type="primary"
							size="small"
							icon="el-icon-edit"
							@click="row.edit=!row.edit"
						>
							修改
						</el-button>
					</el-button-group>
					<el-button
						v-else-if="row.edit === true"
						type="warning"
						size="small"
						:loading="loading"
						@click="commitEdit(row)"
					>
						 提交
					</el-button>
					<el-button
						v-else-if="row.person.status != null && row.person.status != 'commiting'"
						type="info"
						size="small"
						disabled
					>
						待审核
					</el-button>
				</template>
			</el-table-column>
      
			<el-table-column v-if="userName === 'saxc'" align="center" label="编辑" width="220">
				<template  slot-scope="{row}">
					<el-button
						v-if="row.person.status === 'commiting'"
						type="info"
						size="small"
						disabled
					>
						待批准
					</el-button>
					<el-button 
						v-else-if="row.person.status != null && row.person.status != 'commiting'"
						type="warning"
						size="small"
						@click="reviewEdit(row)"
					>
						审核通过
					</el-button>
				</template>
			</el-table-column>

			<el-table-column v-if="userName === 'admin'" align="center" label="编辑" width="220">
				<template  slot-scope="{row}">
					<el-button 
						v-if="row.person.status === 'commiting'"
						type="warning"
						size="small"
						@click="confirmEdit(row)"
					>
						批准
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { GetPersonHouseInfoByUser, updatePersonHouseByNetGrid, ReviewByCommunity, ConfirmByAdmin } from '@/api/person.js'

export default {
	name: 'nanage-personHouse',
	data(){
		return {
			personHouseInfo: [],
			userName: '',
		
			rolesObj: ['网格员', '水岸星城', 'Administrator'],

			loading: false
		}
	},
	filters:{
		
	},
	created(){
		this.getUserName();
		this.getRoomsInfo();
	},
	mounted(){
		
	},
	computed: {
	
	},
	beforeUpdate(){

	},
	methods:{
		//请求房屋信息
		getRoomsInfo (){
			GetPersonHouseInfoByUser().then((res) => {
				this.handleRoomsInfo(res);
			})
		},
		//为每条信息（对象）添加新属性
		handleRoomsInfo (data){
			this.personHouseInfo = data.map(item => {
				if(this.userName === 'saxc1'){
					item.edit = false;//edit: 控制网格员编辑button的显示
					item.person.originPhone = item.person.phone;//originPhone：phone属性值的备份
				}
		
				return item;
			})
		},
		//取消修改
		cancelEdit (row) {
			row.edit = false;
			row.person.phone = row.person.originPhone;//取消编辑时，恢复为原值
		},
		//（网格员）提交修改
		commitEdit (row) {
			row.edit = !row.edit;
			row.person.status = 'updating';
		
			let editParams = {
				'phoneNum': row.person.phone, 
				'personId': row.person.personId,
				'status': row.person.status
			}
	
			updatePersonHouseByNetGrid(editParams).then(res => {
				this.handleRoomsInfo(res);
			}).catch(err => {
				console.log(err);
			})
		},
		//(社区)审核修改通过
		reviewEdit (row){
			row.person.status = 'commiting';

			let personId = row.person.personId;
			let status = row.person.status;
			ReviewByCommunity(personId, status).catch(err => {
				console.log(err);
			})
		},
		//（admin：街道）批准修改
		confirmEdit (row){			
			ConfirmByAdmin(row.person.personId).then(res => {
				this.handleRoomsInfo(res);
			}).catch(err => {
				console.log(err);
			})
		},
		getUserName (){
			this.userName = this.$store.getters.name;
		},

		changedPhone(row){
			//当status属性不为null和commiting时（表明当前行数据处于待审核状态），显示对应的修改字段
			return row.person.status != null ? row.person.editingPhone : row.person.phone ;
		},
		waitingForReview(row){
			return row.person.status != null && row.person.status != 'commiting';
		},
		waitingForConfirm(row){
			return row.person.status === 'commiting';
		}
	}
}
</script>

<style scoped>
	.toolbar{
		margin: 5px;
	}
	.edit-input{
		padding-right: 100px;
	}
	.cancel-btn{
		position: absolute;
		right: 15px;
	}
</style>