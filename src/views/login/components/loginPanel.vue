<template>
	<div class="login_updatePassword" >
      <el-card>
        <el-form
          ref="loginForm"
          label-position="left"
          :rules="loginRules"
          :model="loginForm"
        >
          <h3 class="title">平台登录</h3>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              autocomplete="on"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item
            id="pwd"
            prop="password"
          >
            <el-input
              v-model="loginForm.password"
              :type="passwordType"
              name="password"
              autocomplete="on"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
						<div class="password-about">
							<el-checkbox>记住密码</el-checkbox>
							<el-button type="text" class="update-password" @click="updatePassword">修改密码？</el-button>
						</div>
            <el-button
              :loading="loading"
              type="primary"
							class="login-button"
              @click.native.prevent="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
import { validUsername } from '@/utils/validate';

export default {
	name: 'loginPanel',
	data(){
		const validateUsername = (rule, value, callback) => {
			if(!validUsername(value)){
				callback(new Error('请输入正确的用户名'))
			} else(
				callback()
			)
		}
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
		  labelPosition: 'right',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
				username: [{required:true, trigger: 'blur', validator: validateUsername}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
	},
	methods:{
		showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
		handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' });
            this.loading = false
          }).catch((e) => {
            this.loading = false;
						this.$message.error('登录失败');
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
		updatePassword(){
			this.$emit('chansferShowFileds', false);
		}
	}

}
</script>

<style scoped>
.title {
  text-align: center;
}
.update-password{
	float: right;
}
.login-button {
	width:100%;
	margin: 0;
}
</style>