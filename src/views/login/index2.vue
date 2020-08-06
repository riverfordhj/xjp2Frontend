<template>
  <div
    class="login-container"
    @click="changeBg"
  >
    <div id="bg_wrap">
      <div class="bg"><img
        width="100%"
        height="100%"
        class="img"
        src="@/assets/login_pictures/8.jpg"
        alt=""
      ></div>
      <div class="bg"><img
        width="100%"
        height="100%"
        class="img"
        src="@/assets/login_pictures/2.png"
        alt=""
      ></div>
      <!-- <div class="bg"><img
        width="100%"
        height="100%"
        class="img"
        src="@/assets/login_pictures/4.png"
        alt=""
      ></div> -->
      <div class="bg"><img
        width="100%"
        height="100%"
        class="img"
        src="@/assets/login_pictures/5.png"
        alt=""
      ></div>
      <div class="bg"><img
        width="100%"
        height="100%"
        class="img"
        src="@/assets/login_pictures/6.png"
        alt=""
      ></div>
      <div class="bg"><img
        width="100%"
        height="100%"
        class="img"
        src="@/assets/login_pictures/7.png"
        alt=""
      ></div>
    </div>
    <div id="login">
      <el-card>
        <el-form
          ref="loginForm"
          label-position="left"
          :model="loginForm"
        >
          <h3 class="title">平台登录</h3>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              name="username"
              type="text"
              auto-complete="on"
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
              auto-complete="on"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox>记住密码</el-checkbox>
            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: '',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
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
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  mounted() {
    // window.setInterval(this.opChange,3000);
    // setInterval(function(){
    //   debugger
    //   this.chose1 = !this.chose1;
    //   this.chose2 = !this.chose2;
    // },3000)
    this.changeBg()
  },
  methods: {
    changeBg() {
      var timer = null // 声明定时器
      var oImg = document.querySelectorAll('#bg_wrap div') // h5最新元素获取写法获取到的是一组元素
      // querySelector获取单个元素的   兼容ie8
      var len = oImg.length // 3
      var index = 0
      timer = setInterval(function() {
        oImg[index].style.opacity = 0
        index++
        index %= len // index=index%len求模取余 0%3=0; 1%3=1; 2%3=2; 3%3=0;
        oImg[index].style.opacity = 1
      }, 5000)
    },
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
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
/* html body #app .login-container .img {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .img  {
    -webkit-filter: blur(10px);
       -moz-filter: blur(10px);
        -ms-filter: blur(10px);
            filter: blur(10px);

    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
    width: 100%;
    height: 100%;
  }
  #banner,#banner img{position:relative;width:100%;height:100%;}
	#banner{margin:0 auto;}
  #banner img{position:absolute;top:0;left:0;filter:Alpha(opacity=100);opacity:1;} */

#bg_wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}

#bg_wrap div {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  /* 设置透明度 */
  transition: opacity 3s;
}
/* nth-of-type(1) *筛选选择器选择第一个*/
#bg_wrap div:nth-of-type(1) {
  opacity: 1;
}

.bg {
  /* height: 100%; */
  /* -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); */
}

#login {
  width: 25%;
  max-width: 400px;
  min-width: 250px;
  position: absolute;
  /* margin: 200px auto; */
  left: 80%;
  top: 40%;
  transform: translate(-50%, -50%);
  background-color: whitesmoke;
  border-radius: 5px 5px;
  /* box-shadow:5px 2px 6px #000 */
}

.title {
  text-align: center;
}
</style>
