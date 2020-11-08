<template>
	<div class="toolbar">
			<el-form class="form-container" ref="form" :model="form" :rules="rules" :inline="true">		
				<el-form-item>
					<h3 class="title">{{formTitle}}</h3>
				</el-form-item>
				<el-form-item prop="min" label="" >
						<el-input class="searchNum" placeholder="最小值" v-model.number="form.min" @change="handleValidation" />
				</el-form-item>
				<el-form-item>
					<span>-</span>
				</el-form-item>
				<el-form-item prop="max">
						<el-input class="searchNum" placeholder="最大值" v-model.number="form.max" @change="handleValidation" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native.prevent="handleLogin"
					>	确定
					</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="resetForm('form')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
</template>

<script>
export default {
	name: 'intevalSelection',
	props: ['formTitle'],
	data(){
		return {
			form:{
				min: '',
				max: ''
			},
			rules: {
				min: [
						{ required: true, message: '输入不能为空', trigger: 'blur' },
						{ type: 'number', message: '输入必须为数字值'},
						{ validator: this.validateCompare, trigger: 'blur' },
				],
				max: [
						{ required: true, message: '输入不能为空', trigger: 'blur' },
						{ type: 'number', message: '输入必须为数字值'},
						{ validator: this.validateCompare, trigger: 'blur' },
				],
			}
		}
	},
	methods: {
		validateCompare(rule, value, callback){
			if(this.form.min !== '' && this.form.max !== ''){
				// debugger;
				const min = Number(this.form.min);
				const max = Number(this.form.max);
				if(min >= max){
					return callback(new Error('请输入合适的查询区间'));
				}
			}
		},
		handleLogin(){
			if(this.form.min === '' || this.form.max === ''){
				this.$message({
					message: '请输入合适的查询区间',
					type: 'warning'
				});
			}else{
				const min = Number(this.form.min);
				const max = Number(this.form.max);
				// this.filteredCompanyTaxData = this.companyTaxData.filter(item => {
				// 	return item.totalTax >= min && item.totalTax <= max; 
				// })
				this.$emit('selectedInterval', {
					min,
					max
				});
			}
		},
		resetForm(formName){
			this.$refs[formName].resetFields();
			this.$emit('resetStatistics');
		},
		handleValidation(){
			if(this.form.min !== '' && this.form.max !== ''){
				this.$refs['form'].validate((bool) =>{
					debugger;
					console.log(1);
					console.log(bool);
				});
			};
		}
	}
}
</script>

<style scoped>
	.toolbar {
		margin: 8px 5px 0;
	}
	.form-container{
		display: flex;
		align-items: center;
	}
	.title {
		margin: 0;
	}

</style>