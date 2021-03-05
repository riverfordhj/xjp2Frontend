<template>
		<el-dialog
			title="新建"
			:visible.sync="dialogVisible"
			width="45%"
			center
			@close="handleClose"
		>
			<el-form  :model="formData" :rules="rules" ref="formData" size="small" label-width="110px">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="姓名" prop="name">
							<el-input v-model="formData.name" placeholder="请填写" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证号" prop="personId">
							<el-input v-model="formData.personId" placeholder="请填写" clearable></el-input>
						</el-form-item>	
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="联系方式" prop="phone">
							<el-input v-model="formData.phone" placeholder="请填写" clearable></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="12">
						<el-form-item label="民族" prop="ethnicGroups">
							<el-input v-model="formData.ethnicGroups" placeholder="请填写" clearable></el-input>
						</el-form-item>	
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="户籍地址" prop="domicileAddress">
							<el-input v-model="formData.domicileAddress" placeholder="请填写" clearable></el-input>
						</el-form-item>	
					</el-col>
					<el-col :span="12">
						<el-form-item label="从业单位" prop="company">
							<el-input v-model="formData.company" placeholder="请填写" clearable></el-input>
						</el-form-item>	
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="政治面貌" prop="politicalState">
							<el-select v-model="formData.politicalState" placeholder="请选择" clearable>
									<el-option v-for="item in personRoomDataOptions.politicalStatuArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>	
					</el-col>
					<el-col :span="12">
						<el-form-item label="组织关系" prop="organizationalRelation">
							<el-select v-model="formData.organizationalRelation" placeholder="请选择" clearable>
									<el-option v-for="item in personRoomDataOptions.organizationalRelationArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>	
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="是否侨胞" prop="isOverseasChinese">
							<el-radio-group v-model="formData.isOverseasChinese" size="small" >
								<el-radio v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" border></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="婚姻状况" prop="merriedStatus">
							<el-select v-model="formData.merriedStatus" placeholder="请选择" >
								<el-option v-for="item in personRoomDataOptions.merriedStatusArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="是否为户主" prop="isHouseholder">
							<el-radio-group v-model="formData.isHouseholder" size="small" >
								<el-radio v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" border></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="与户主关系" prop="relationWithHouseholder">
							<el-select v-model="formData.relationWithHouseholder" placeholder="请选择" >
									<el-option v-for="item in personRoomDataOptions.relationWithHouseholderArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
					<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="是否为产权人" prop="isOwner">
							<el-radio-group v-model="formData.isOwner" size="small">
								<el-radio v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" border></el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否在此居住" prop="isLiveHere">
							<el-select v-model="formData.isLiveHere" placeholder="请选择" >
									<el-option v-for="item in personRoomDataOptions.FalseOrTrue" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="人口性质" prop="populationCharacter">
							<el-select v-model="formData.populationCharacter" placeholder="请选择" >
									<el-option v-for="item in personRoomDataOptions.populationCharacterArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="寄住原因" prop="lodgingReason">
							<el-select v-model="formData.lodgingReason" placeholder="请选择" >
									<el-option v-for="item in personRoomDataOptions.LodgingReasonArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="房屋类别" prop="category">
							<el-select v-model="formData.category" placeholder="请选择" >
									<el-option v-for="item in personRoomDataOptions.categoryValueArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="房屋用途" prop="roomUse">
							<el-select v-model="formData.roomUse" placeholder="请选择" >
									<el-option v-for="item in personRoomDataOptions.roomUseArray" :key="item" :label="item" :value="item"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="楼栋名" prop="buildingName" >
							<el-select v-model="formData.buildingName" placeholder="请选择"  @change="buildingSelected">
								<el-option
									v-for="item in buildingsData"
									:key="item.id"
									:value="item.buildingName">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="房间号" prop="roomName" >
							<el-select v-model="formData.roomName" placeholder="请选择" >
								<el-option
									v-for="item in roomsData"
									:key="item.id"
									:value="item.roomName">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			  <el-row type="flex" justify="center" :gutter="20">
					<el-col :span="12">
						<el-form-item>
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
import { GetBuildingsByNetGrid, GetRoomsByBuildingAndNetgrid } from '@/api/person.js';
import checkPermission from '@/utils/permission.js';//权限判断函数
import personRoomDataOptions from '@/assets/json/personRoomDataOptions.json';

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
				ethnicGroups: '',
				phone: '',
				domicileAddress: '',
				company: '',
				politicalState: '',
				organizationalRelation: '',
				isOverseasChinese: '',
				merriedStatus: '',
				note: '',
				status: '',
		
				isHouseholder: '',
				relationWithHouseholder: '',
				isOwner: '',
				isLiveHere: '',
				populationCharacter: '',
				lodgingReason: '',
				category: '',
				roomName: '',
				roomUse: '',
				buildingName: '',
				netGrid: '',
				communityName: '',
				operation: '',
			},
			buildingsData: [],
			roomsData: [],
			
			personRoomDataOptions,
			rules: {
				 name: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 personId: [{ required: true, message: '选项不能为空', trigger: 'change' },{ min: 18, max: 18, message: '身份证长度为18位', trigger: 'blur' }],
				 ethnicGroups: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 phone: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 domicileAddress: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 
				 
				 isOverseasChinese: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 merriedStatus: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 isHouseholder: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 relationWithHouseholder: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 isOwner: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 isLiveHere: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 populationCharacter: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 lodgingReason: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 category: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 roomName: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 roomUse: [{ required: true, message: '选项不能为空', trigger: 'change' }],
				 buildingName: [{ required: true, message: '选项不能为空', trigger: 'change' }],
			}
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
				this.bus.$emit('buildingsDataReceived', res);
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
		handleCreate(formName){
			 this.$refs[formName].validate((valid) => {
          if (valid) {
            	this.formData.status = 'committed';
							this.formData.operation = 'creating'
							this.formData.netGrid = this.recordsObj.netGridName;
							this.formData.communityName = this.recordsObj.communityName;

							this.$emit('createPersonHouse', this.formData);
          } else {
            return false;
          }
        });
		
		},
		handleClose(){
			this.$emit('closeCreatePanel', false);
		},

		checkPermission,
		resetForm(formName){
			this.$refs[formName].resetFields();
		}
	
	}
}
</script>

<style>

</style>