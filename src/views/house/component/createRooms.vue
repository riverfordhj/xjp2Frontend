<template>
		<el-dialog
			title="新建"
			:visible.sync="visibleValue"
			center
			width="30%"
			@close="handleClose"
		>
			<el-form  :model="formData" :rules="rules" ref="formData" size="small" label-width="100px">
				<el-row :gutter="20">
					<el-col :span="18" :offset="1">
						<el-form-item label="社区名" prop="communityName">
							<el-select v-model="formData.communityName" placeholder="请选择" @change="getNetGridData">
								<el-option v-for="item in filteredCommunities" :key="item.id" :label="item.name" :value="item.name" />
							</el-select>
						</el-form-item>	
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="18" :offset="1">
						<el-form-item label="网格名" prop="netGridName">
							<el-select v-model="formData.netGridName" placeholder="请选择" clearable  @change="SelectedNetGrid" >
								<el-option v-for="item in filteredNetGrids" :key="item.id" :label="item.name" :value="item.name" />
							</el-select>
						</el-form-item>	
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="18" :offset="1" >
						<el-form-item label="楼栋名" prop="buildingName">
							<el-input v-model.trim="formData.buildingName" placeholder="请输入" type="text" maxlength="15" show-word-limit/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="18" :offset="1">
						<el-form-item label="单元数" prop="units">
							<el-input v-model.number="formData.units" type="text" maxlength="1" show-word-limit placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row  :gutter="20">
					<el-col :span="18" :offset="1">
						<el-form-item label="楼层数" prop="floors">
							<el-input v-model.number="formData.floors" type="text" maxlength="3" show-word-limit placeholder="请输入" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center" >
					<el-col :span="18">
						<el-form-item >
							<el-button type="warning" icon="el-icon-refresh" @click="handleClose" >取 消</el-button>
							<el-button type="primary" icon="el-icon-check"  @click="handleCreate('formData')">确 定</el-button>
							<el-button @click="resetForm('formData')">重 置</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
</template>

<script>
import { getCommunitys, getNetGridInCommunity, getBuildingInNetGrid } from '@/api/person.js';

export default {
	name: 'createRooms',
	props:{
		dialogVisible: {
			type: Boolean,
			default: false
		}
	},
	data(){
		return {
			visibleValue: this.dialogVisible,
			filterValue: '',
			communityData: [],
			netGridData: [],
			formData: {
				communityName: '',
				netGridName: '',
				buildingName: '',
				units: '',
				floors: '',
			},

			//分页默认配置
			paginationSetting: {
				limit: 20,
				curPage: 1
			},
			rules:{
				communityName: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				netGridName: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				buildingName: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				units: [{ required: true, message: '选项不能为空', trigger: 'change' }, { type: 'number', message: '单元数必须为数字值'}],
				floors: [{ required: true, message: '选项不能为空', trigger: 'change' }, { type: 'number', message: '楼层数必须为数字值'}],
			}
		}
	},
	created(){
		getCommunitys().then((res) =>{
			this.communityData = res;
		});
	},
	computed:{
		filteredCommunities() {
			if(!!this.filterValue){
				const keyValue = this.filterValue.split(/[，,]/g)[0];
				return this.communityData.filter((item) => item.includes(keyValue));
			}else{
				return this.communityData;
			}
		},
		filteredNetGrids() {
			if(!!this.filterValue){
				const keyValue = this.filterValue.split(/[，,]/g)[1];
				return this.netGridData.filter((item) => item.includes(keyValue));
			}else{
				return this.netGridData;
			}
		}
	},
	watch: {
		dialogVisible(newVal, oldVal){
			this.visibleValue = newVal;
		}
	},
	methods: {
		handleClose(){
			this.$emit('closeDialogPanel', false)
		},
		getNetGridData(communityName){
			//找出社区名对应的某条社区数据
			const communityItem = this.filteredCommunities.find((item) => {
				return item.name === communityName;
			})
			//请求后台网格数据
			getNetGridInCommunity(communityItem.id).then((res) =>{
				this.netGridData = res;
			})
		},
		SelectedNetGrid(netGridValue){

		},
		handleCreate(formName){
			this.$refs[formName].validate((valid) => {
				if(valid){
					this.$emit('handleCreateRooms', this.formData);
					debugger;
				}
			})
		},
		resetForm(formName){
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<style scoped>
	.form-select,
  .form-input{
		width: 200px;
	}
</style>