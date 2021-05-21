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
    <div id="login_container">
			<login-panel @chansferShowFileds="switchPanel" v-if="this.showLogin"></login-panel>
			<update-password-panel v-else @switchTologinPanel="switchPanel"></update-password-panel>
		</div>
      
  </div>
</template>

<script>
import loginPanel from './components/loginPanel.vue';
import updatePasswordPanel from './components/updatePasswordPanel.vue';

export default {
  name: 'mainInteface',
  data() {
		return{
			showLogin: true
		}
  },
  mounted() {
    this.changeBg()
  },
	components:{
		loginPanel,
		updatePasswordPanel
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
		switchPanel(boolValue){
			this.showLogin = boolValue;
		}
  }
}
</script>

<style scoped>

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

#bg_wrap div:nth-of-type(1) {
  opacity: 1;
}
</style>
