<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-left"><a href=""></a></div>
        <div class="mh-middle">徐家棚经济楼宇一张图</div>
        <div class="mh-right">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
          >
            综合展示台
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <dv-border-box-3 class="left-chart-container">

          <Left-Chart-1 />
          <Left-Chart-2 />
          <Left-Chart-3 />

        </dv-border-box-3>

        <div class="right-main-container">
          <div class="rmc-top-container">
              <digital-flop />
          </div>
          <div class="rmc-center-container">
            <dv-border-box-3 class="rmctc-left-container">

              <Center-Cmp />

            </dv-border-box-3>

            <div class="rmctc-right-container">
              <dv-border-box-3 class="rmctc-chart-1">

                <Right-Chart-1 />

              </dv-border-box-3>
              
              <dv-border-box-4 class="rmctc-chart-2" :reverse="true" >

								<Right-Chart-2 />

								<Right-Chart-3 />
								
							</dv-border-box-4>
            </div>
          </div>

          <dv-border-box-4 class="rmc-bottom-container" >
            <el-tabs class="revenuetop" v-model="activeName1" style="width:100%;height:100%;" @tab-click="handleClick">
              <el-tab-pane class="revenuetop" label="产业营收前三" name="third">                 
					        <Bottom-Charts />				        
              </el-tab-pane>
              <el-tab-pane class="revenuetop" label="产业税收前三" name="forth">
					        <Bottom-Charts-1 />
              </el-tab-pane>
            </el-tabs>
          </dv-border-box-4>
        </div>
      </dv-border-box-1>

    </dv-full-screen-container>
  </div>
</template>

<script>
import LeftChart1 from './LeftChart1'
import LeftChart2 from './LeftChart2'
import LeftChart3 from './LeftChart3'

import digitalFlop from './digitalFlop'

import CenterCmp from './CenterCmp'

import RightChart1 from './RightChart1'
import RightChart2 from './RightChart2'
import RightChart3 from './RightChart3'

import BottomCharts from './BottomCharts'
import BottomCharts1 from './BottomCharts1'

export default {
  name: 'DataView',
  components: {
    LeftChart1,
    LeftChart2,
    LeftChart3,
    digitalFlop,
    CenterCmp,
    RightChart1,
    RightChart2,
    RightChart3,
    BottomCharts,
		BottomCharts1
  },
  data () {
    return {
			activeName1: 'third'
      }
  },
  methods:{
        handleClick(){

        }
  }
}
</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
   background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
     overflow: visible;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {
    min-height: 90%;
    width:97%;
    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .left-chart-container {
    width: 24%;
    padding: 10px;
    box-sizing: border-box;

    .border-box-content {
      flex-direction: column;
    }
  }

  .right-main-container {
    width: 76%;
    padding-left: 5px;
    box-sizing: border-box;
  }
  .rmc-top-container{
    height: 10%;
   }
  .rmc-center-container {
    height: 55%;
    display: flex;
  }

  .rmctc-left-container {
    width: 65%;
  }

  .rmctc-right-container {
    width: 35%;
  }

  .rmc-bottom-container {
    height: 35%;
  }

  .rmctc-chart-1, .rmctc-chart-2 {
    height: 50%;
    box-sizing: border-box;
  }
  .revenuetop .el-tabs__content{
    width: 1380px;
    margin-top: -45px;
  }
  .revenuetop .el-tabs{
    margin-top:-5px;
    margin-left:-10px;
  }
  .revenuetop .el-tabs__item{
    color:aqua;
  }
}
</style>