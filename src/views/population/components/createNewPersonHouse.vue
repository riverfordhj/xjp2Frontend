<template>
		<el-dialog
			title="新建"
			:visible.sync="dialogVisible"
			width="30%"
			center
			@close="handleClose"
		>
			<el-form  :model="formData" class="demo-form-inline" label-width="100px">
				<el-form-item label="姓名" >
					<el-input v-model="formData.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item label="身份证" >
					<el-input v-model="formData.personId" placeholder="身份证"></el-input>
				</el-form-item>		
				<el-form-item label="电话" >
					<el-input v-model="formData.phone" placeholder="电话"></el-input>
				</el-form-item>	
				<el-form-item label="是否为户主" >
					<el-radio-group v-model="formData.isHouseholder" size="small">
						<el-radio label="是" border>是</el-radio>
						<el-radio label="否" border>否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="与户主的关系" >
					<el-input v-model="formData.relationWithHouseholder" placeholder="与户主的关系"></el-input>
				</el-form-item>
				<el-form-item label="人口性质" >
					<el-input v-model="formData.populationCharacter" placeholder="人口性质"></el-input>
				</el-form-item>
				<el-form-item label="房屋性质" >
					  <el-select v-model="formData.category" placeholder="请选择">
							<el-option v-for="item in categoryValueArray" :key="item" :label="item" :value="item"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="房屋用途" >
					 <el-radio-group v-model="formData.roomUse" size="small">
						<el-radio label="居住" border>居住</el-radio>
						<el-radio label="商用" border>商用</el-radio>
						<el-radio label="其他" border>其他</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="楼宇名称" >
					<el-select v-model="formData.buildingName" placeholder="请选择" clearable  @change="buildingSelected">
						<el-option
							v-for="item in buildingsData"
							:key="item.id"
							:value="item.buildingName">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="房间号" >
					<el-select v-model="formData.roomName" placeholder="请选择" clearable >
						<el-option
							v-for="item in roomsData"
							:key="item.id"
							:value="item.roomName">
						</el-option>
					</el-select>
				</el-form-item>
			
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button type="warning" icon="el-icon-refresh" @click="handleClose" >取 消</el-button>
				<el-button type="primary" icon="el-icon-check"  @click="handleCreate">确 定</el-button>
			</span>
		</el-dialog>
</template>

<script>
import { GetBuildingsByNetGrid, GetRoomsByBuildingAndNetgrid } from '@/api/person.js';
import checkPermission from '@/utils/permission.js';//权限判断函数

export default {
	name: 'createNewPersonHouse',
	props: {
		recordsObj: {
			type: Object,
			required: true
		},
		dialogVisibleForCreating: {
			type: Boolean,
			required: true,//是否必须传值
			default: false,//没有传值时,默认值
		}
	},
	data(){
		return {
			dialogVisible: this.dialogVisibleForCreating,
			//新建数据的必要字段（禁止修改属性名）
			formData: {
				name: '',
				personId: '',
				phone: '',
				status: '',
		
				isHouseholder: '',
				relationWithHouseholder: '',
				populationCharacter: '',
				category: '',
				buildingName: '',
				roomName: '',
				netGrid: '',
				communityName: '',
				operation: '',
			},
			buildingsData: [],
			roomsData: [],

			categoryValueArray: ['自用', '租用（借用）', '空置', '征收', '其他']
		}
	},
	created(){
		if(checkPermission('网格员')){
			this.getBuildingsData();
		}
	},
	watch: {
		dialogVisibleForCreating(newVal, oldVal){
			this.dialogVisible = newVal;
		}
	},
  methods:{
		getBuildingsData(){
			//根据网格员，请求楼栋数据
			GetBuildingsByNetGrid().then(res => {
				this.buildingsData = res;
			});
		},
		buildingSelected(buildingName){
			//根据网格、楼栋，请求房间数据
			GetRoomsByBuildingAndNetgrid(buildingName).then(res => {
				this.roomsData = res;
			}).catch(err => {
				console.log(err);
			})
		},
		//构造新建personHouse的参数，传给父组件
		handleCreate(){
			this.formData.status = 'committed';
			this.formData.operation = 'creating'
			this.formData.netGrid = this.recordsObj.netGridName;
			this.formData.communityName = this.recordsObj.communityName;

			this.$emit('createPersonHouse', this.formData);
		},
		handleClose(){
			this.$emit('closeCreatePanel', false);
		},

		checkPermission
	
	}
}
</script>

<style>

</style>