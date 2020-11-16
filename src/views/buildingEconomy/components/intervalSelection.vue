<template>
	<div class="toolbar">
		<el-form class="form-container" ref="form" :model="form" :rules="rules" :inline="true">		
			<el-form-item>
				<h3 class="title">{{formTitle}}</h3>
			</el-form-item>
			<el-form-item prop="min" label="" >
					<el-input class="searchNum" placeholder="最小值" v-model.number="form.min" />
			</el-form-item>
			<el-form-item>
				<span>-</span>
			</el-form-item>
			<el-form-item prop="max">
					<el-input class="searchNum" placeholder="最大值" v-model.number="form.max" />
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
// 
export default {
	name: 'intevalSelection',
	props: {
		formTitle: {
			type: String,
			required: false,
			default: ''
		},
		defaultInterval: {
			type: Object,
			required: false,
			default: () =>{
				return {
					min: '',
					max: ''
				};
			},
			validator: function(objValue){
				//检查传入的对象数据是否包含属性min、max。不包含，则报错。
				return objValue.hasOwnProperty('min') && objValue.hasOwnProperty('max');
			}
		}
	},
	data(){
		return {
			form: this.defaultInterval,
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
		//校验min 和 max值
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
				this.$emit('selectedInterval', {
					min,
					max
				});
				// this.notify(min, max);
			}
		},
		resetForm(formName){
			this.$refs[formName].resetFields();
			this.$emit('resetStatistics');
		}
		// notify(minNum, maxNum){
		// 	const h = this.$createElement;

		// 	this.$notify({
		// 		title: '数据统计',
		// 		message: h('i', { style: 'color: teal'}, `已选择区间${minNum}-${maxNum}（万元）`)
		// 	});
		// }
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