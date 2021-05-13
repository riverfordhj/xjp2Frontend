<template>
  <div class="container">
		<div class="toolbar" >
			<el-button 
			  class="create-button"
				type="primary" 
				icon="el-icon-edit"
				@click="dialogVisible = true"
		  >
				按楼栋新建房屋
			</el-button>
			<!-- 通过excel批量新建房屋面板 -->
			<batching-create-room 
				label-name="导入新建房屋"
				:standard-header="tableHeaderForXlsx" 
				:standard-header-en="filterValForXlsx" 
				@tranferRoomData="handleRoomData_excel"
			></batching-create-room>
			<!-- 房屋检索面板 -->
			<room-search-panel @transferRoomsData="handleRoomData"></room-search-panel>
		</div>

		<el-table
			:data="RoomDataList" 
			height="835" 
			border
			class="HouseInfoTable"	
			style="width: 100%"
		>
			<el-table-column align="center" type="index" :index="customizeIndex"	width="50" label="ID" >
			</el-table-column>
			<el-table-column align="center" label="房屋名称" min-width="120" >
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.roomName" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.roomName }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="房屋类别" min-width="140" >
					<template slot-scope="{row}">
						<el-select v-if="row.edit" v-model="row.category" size="small" placeholder="请选择">
							<el-option v-for="item in personRoomDataOptions.categoryValueArray" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<span v-else>{{ row.category }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="房屋用途" min-width="140" >
					<template slot-scope="{row}">
						<el-select v-if="row.edit" v-model="row.use" size="sm      all" placeholder="请选择">
							<el-option v-for="item in personRoomDataOptions.roomUseArray" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<span v-else>{{ row.use }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="面积m²" min-width="120">
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.area" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.area }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="经度" min-width="160" >
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.longitude" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.longitude }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="纬度" min-width="160" >
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.latitude" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.latitude }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="高程" min-width="120" >
					<template slot-scope="{row}">
						<el-input v-if="row.edit" v-model="row.height" class="edit-input" size="small" clearable/>
						<span v-else>{{ row.height }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="地址" min-width="140" >
					<template slot-scope="{row}">
						<span>{{ row.address }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="楼栋名称" min-width="80" >
					<template slot-scope="{row}">
						<span>{{ row.buildingName}}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="网格号" min-width="80" >
					<template slot-scope="{row}">
						<span>{{ row.netGridName }}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" label="社区名称" min-width="140" >
					<template slot-scope="{row}">
						<span>{{ row.communityName }}</span>
					</template>
			</el-table-column>
			<el-table-column  align="center" label="编辑" min-width="170" >
				<template slot-scope="{row}">
					<el-button-group v-if="row.edit === false" :key="row.roomName">
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
					<el-button-group v-else-if="row.edit === true" >
						<el-button
							class="cancel-btn"
							size="small"
							type="warning"
							@click="cancelEdit(row)"
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
				</template>
			</el-table-column>
		</el-table>

		<create-rooms
			:dialog-visible="dialogVisible"
			@closeDialogPanel="dialogVisible = $event"
			@handleCreateRooms="BatchingRooms"
		></create-rooms>

		 <!-- 分页显示 -->
		<pagination 
			:total-num="total" 
			:page.sync="paginationSetting.curPage" 
			:limit.sync="paginationSetting.limit" 
		></pagination>
  </div>
</template>

<script>
	import pagination from '../../components/pagination.vue';
	import createRooms from './component/createRooms.vue';
	import batchingCreateRoom from './component/batchingCreateRoom.vue';
	import roomSearchPanel from './component/roomSearchPanel.vue'

	import { batchingRoomsData, deleteRoom, updateRoom } from '@/api/house.js';
	import personRoomDataOptions from '@/assets/json/personRoomDataOptions.json';

	import { deepClone } from '@/utils/tools.js';

  export default {
    name: 'manage-house',
    data() {
      return {
        roomData: [],
				tempRoomData: [],//roomData的缓存
				dialogVisible: false,
				//分页默认配置
				paginationSetting: {
					limit: 20,
					curPage: 1
				},
				tableHeaderForXlsx: ['房屋底面高程','层高','社区名称','网格号','楼栋名称','地址','单元号','房屋号',
														 '经度','纬度','房屋类别','房屋用途','面积'],
				filterValForXlsx: ['房屋底面高程','层高','CommunityName','NetGridName','BuildingName','Address',
														'单元号','房屋号','Longitude','Latitude','Category','Use','Area'],
				personRoomDataOptions
      }
    },
		components: {
			pagination,
			createRooms,
			batchingCreateRoom,
			roomSearchPanel
		},
		computed: {
			total() {
				return this.roomData.length;
			},
			RoomDataList(){
				return this.roomData.filter((item, index) => {
					return index >= (this.paginationSetting.curPage - 1) * this.paginationSetting.limit && index < this.paginationSetting.curPage * this.paginationSetting.limit;
				})
			},
			customizeIndex(){
				return (this.paginationSetting.curPage - 1) * this.paginationSetting.limit + 1;
			}
		},
		methods: {
			BatchingRooms(formData){
				batchingRoomsData(formData).then((res) => {
					if(Array.isArray(res) && res.length === 0){
						this.$message({
							message: '该楼栋已存在',
							type: 'warning'
						});
						return;//返回数据为空数组时，说明该楼栋在后台已创建。
					}
					this.roomData = res;
				})
			},
			//处理房屋数据检索结果
			handleRoomData(roomDataRes){
				this.roomData = roomDataRes.map((item, index) => {
					this.$set(item, 'edit', false);//新增响应式属性edit: 控制修改部件的显示
				  return item;
				});
			  this.tempRoomData = deepClone(this.roomData, []);//克隆roomData
			},
			//显示导入的房屋数据结果
			handleRoomData_excel(roomDataRes){
				var errorList = [];
				//分别收集导入成功、失败的房屋数据
				this.roomData = roomDataRes.reduce((accumulator, curEle, curIndex) => {
					if(JSON.stringify(curEle) !== '{}'){
						this.$set(curEle, 'success', true);//新增响应式属性edit: 控制修改部件的显示
						accumulator.push(curEle);
					}else{
						errorList.push(curIndex + 2);//收集返回的空结果
					}
					return accumulator;
				}, []);

				this.tempRoomData = deepClone(this.roomData, []);//克隆roomData
				
				this.createRoomErrorFun(errorList);
			},
			//数据导入失败提醒
			createRoomErrorFun(infoList){
				if(Array.isArray(infoList) && infoList.length !== 0){
					const errString = infoList.join();
					this.$message({
						showClose: true,
						duration: 0,
						message: `Excel表格中第${errString}行数据入库失败（已存在）`,
						type: 'warning'
					})
				}
			},
			cancelEdit(row){
				row.edit = false;
				this.roomData = deepClone(this.tempRoomData, []);//取消修改时，还原数据。
			},
			//修改指定房屋
			handleUpdate(row){
				updateRoom(row).then(res => {
						debugger;
					this.handleRoomData(res);
					this.$message({
					  message: '修改成功',
          	type: 'success' 
					});
					debugger;
				}).catch(err => {
					console.log(err);
				})
			},
			//删除指定房屋
			handleDelete(row){
				deleteRoom(row).then(res => {
					this.compareRoomCount(res.length, this.roomData.length);
					this.handleRoomData(res);
				}).catch(err => {
					console.log(err);
				})
			},
			compareRoomCount(newDataCount, oldDataCount){
				if(newDataCount < oldDataCount){
					this.$message({
					  message: '删除成功',
          	type: 'success' 
					});
				}else if(newDataCount === oldDataCount){
					this.$message({
					  message: '该房屋有居民，无法删除',
						type: 'warning'
					});
				}
			}
		}
  }
</script>

<style scoped>
  .create-button{
		padding-left: 10px;
		padding-right: 10px;
	}
	.toolbar{
		margin: 5px;
	}

	.HouseInfoTable >>> div.cell,
	.HouseInfoTable >>> div.cell input{
    padding: 0 3px
	}

</style>