<template>
	<div class="login_updatePassword">
		<el-card>
		  <el-form class="user-account-key" status-icon ref="form" :model="form" :rules="rules" label-width="85px">
			  <h3 class="title">密码修改</h3>
				<el-form-item label="用户名" prop="Account">
						<el-input placeholder="请输入用户名" v-model="form.Account"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="lastpassword">
						<el-input type="password" placeholder="请输入密码" v-model="form.lastpassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="password">
						<el-input type="password" placeholder="请设置新密码" v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" prop="checkPassword">
						<el-input type="password" placeholder="请确认新密码" v-model="form.checkPassword"></el-input>
				</el-form-item>
				<div class="button-container"> 
						<el-button type="primary" @click="onSubmit('form')">修改</el-button>
						<el-button @click="$refs['form'].resetFields()">重置</el-button>
						<el-button icon="el-icon-arrow-left" @click="backToLogin">返回登录</el-button>
				</div>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { UpdatePassword } from '@/api/user.js';

export default {
	name: 'updatePasswordPanel',
	data(){
		var validatelength = (rule, value, callback) =>{
			if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
		};
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else {
				if (this.form.checkPassword !== '') {
					this.$refs.form.validateField('checkPassword');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入新密码'));
			} else if (value !== this.form.password) {
				callback(new Error('两次输入新密码不一致!'));
			} else {
				callback();
			}
		}
		return{
			rules: {
				//验证规则
				Account: [
					{	required: true,	message: '请输入用户名',trigger: 'blur' }
				],
				lastpassword: [
					{	required: true,	message: '请输入密码', trigger: 'blur'},
					{ validator: validatelength, trigger: 'blur'}
				],
				password: [
					{ validator: validatePass, trigger: 'blur' },
					{ validator: validatelength, trigger: 'blur'}
				],
				checkPassword: [
					{ validator: validatePass2, trigger: 'blur' },
					{ validator: validatelength, trigger: 'blur'}
				]
			},
			form: {
				Account: '',
				lastpassword: '',
				password: '',
				checkPassword: ''
			},
			userInfo: null
		}
	},
	created(){
	},
	methods: {
		onSubmit(formName){
			this.$refs[formName].validate(valid => {
				if(valid){
					this.getUserInfo(this.form);
				}
			})
		},
		backToLogin(){
			this.$emit('switchTologinPanel', true);
		},
		getUserInfo(formData){
			UpdatePassword(formData).then(res => {
				if(this.judgeInfo(res) && (res.message ==='该用户不存在' || res.message ==='密码错误')){
					this.showMessageInfo(false, 3000, res.message, 'error');
				}else {
					this.showMessageInfo(false, 3000, res.message, 'success');
				}
			}).catch(err => {
				console.log(err);
			})
		},
		//判断参数是否是对象，并拥有‘message’属性
		judgeInfo(objItem){
			return Object.prototype.toString(objItem) === '[object Object]' && objItem.hasOwnProperty('message'); 
		},
		//消息提示函数
		showMessageInfo(showClose, duration, message,type){
			this.$message({
				showClose,
				duration,
				message,
				type
			});
		}
	}
}
</script>

<style scoped>
.title {
  text-align: center;
}
.button-container{
	display: flex;
	justify-content: center;
}
</style>